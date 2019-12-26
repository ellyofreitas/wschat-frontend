<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login in Vue Chat</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="formLogin" @submit="login">
                  <v-text-field
                    label="E-mail"
                    name="email"
                    prepend-icon="mdi-account"
                    type="email"
                    v-model="email"
                    @keydown.enter="login"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock-question"
                    type="password"
                    v-model="password"
                    @keydown.enter="login"
                  />
                </v-form>
                <router-link to="register" style="text-decoration: none;">
                  <v-btn x-small outlined>
                    Not have an account yet?
                  </v-btn>
                </router-link>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" block @click="submitForm">Login</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';

const { mapActions } = createNamespacedHelpers('auth');

export default {
  props: {
    source: String,
  },
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    submitForm() {
      this.$refs.formLogin.$emit('submit');
    },
    async login() {
      this.authenticate({ email: this.email, password: this.password });
    },
    ...mapActions(['authenticate']),
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>
