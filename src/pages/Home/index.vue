<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <!-- <v-list-item link>
          <v-list-item-avatar>
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>John</v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <v-list-item
          v-show="user.username !== username"
          v-for="user in users"
          :key="user.id"
          link
          @click="to = user.username"
        >
          <v-list-item-avatar>
            <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title
              :style="`color:${user.online ? '#39ff14' : '#ff0000'};`"
              >{{ user.username }}</v-list-item-title
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-btn icon @click.stop="drawer = !drawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <v-toolbar-title
        :style="`color:${socketConnected ? '#39ff14' : '#ff0000'};`"
      >
        {{ username }}
      </v-toolbar-title>
      <v-spacer />
      <v-btn icon @click.stop="logout()">
        <v-icon>mdi-exit-to-app</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container
        v-show="to"
        fluid
        style="display: flex;
        justify-content: space-between;
        min-height: 100%;
        flex-direction: column;
        flex-grow: 1;
        "
      >
        <v-container fluid>
          <v-row
            v-for="message in messages"
            :key="message.id"
            style="margin: 5px;"
            align="end"
            :justify="message.owner === username ? 'end' : 'start'"
          >
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-subtitle>
                    {{ message.owner }}
                  </v-list-item-subtitle>
                  <v-list-item-title>
                    {{ message.content }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-row>
        </v-container>
        <v-footer>
          <v-text-field
            autofocus=""
            label="Digite sua mensagem"
            @keypress="submit"
            v-model="message"
          ></v-text-field>
        </v-footer>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { mapState, createNamespacedHelpers } from 'vuex';

const {
  mapState: authState,
  mapActions: authActions,
} = createNamespacedHelpers('auth');

const { mapState: userState } = createNamespacedHelpers('user');

export default {
  props: {
    source: String,
  },

  data: () => ({
    channel: null,
    drawer: true,
    to: null,
    users: [],
    message: '',
    messages: [],
  }),

  methods: {
    ...authActions(['logout']),
    connectSocket() {
      this.channel =
        this.$ws.getSubscription('chat') || this.$ws.subscribe('chat');
    },
    submit(e) {
      if (e.keyCode === 13) {
        if (this.message === '') {
          return;
        }

        if (!this.to) {
          return console.log('Without to');
        }

        const message = {
          content: this.message,
          to: this.to,
        };
        this.message = '';
        this.channel.emit('message', message);
      }
    },
  },
  computed: {
    ...userState(['username']),
    ...authState(['token']),
    ...mapState(['socketConnected']),
  },
  watch: {
    to(user) {
      this.messages = [];
      console.log(user);
    },
  },
  updated() {
    this.$ws.on('open', () => {
      this.connectSocket();
    });
  },
  beforeMount() {
    this.connectSocket();
  },
  mounted() {
    this.channel.on('message', message => {
      this.messages.push(message);
    });

    this.channel.on('users', users => (this.users = users));

    this.channel.on('userOnline', username => {
      console.log(`${username} is online`);
    });

    this.channel.on('userOffline', username => {
      console.log(`${username} is offline`);
    });
  },
  created() {
    this.$ws.withJwtToken(this.token).connect();
    this.$vuetify.theme.dark = true;
  },
};
// fetch('https://uinames.com/api/?region=United%20States')
//   .then(r => r.json())
//   .then(user => (this.owner = `${user.name} ${user.surname}`));
</script>
