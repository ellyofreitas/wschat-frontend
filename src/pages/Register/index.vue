<template>
  <v-app id="inspire">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Register in Vue Chat</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form ref="formLogin" @submit="signUp">
                  <v-text-field
                    label="Username"
                    name="username"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="username"
                  />

                  <v-text-field
                    label="E-mail"
                    name="email"
                    prepend-icon="mdi-account"
                    type="email"
                    v-model="email"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="mdi-lock-question"
                    type="password"
                    v-model="password"
                  />
                </v-form>
                <router-link to="login" style="text-decoration: none;">
                  <v-btn x-small outlined>
                    Already have an account?
                  </v-btn>
                </router-link>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" block @click="submitForm"
                  >Register</v-btn
                >
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

const { mapActions: userActions } = createNamespacedHelpers('user');

export default {
  props: {
    source: String,
  },
  data: () => ({
    email: '',
    username: '',
    password: '',
  }),
  methods: {
    submitForm() {
      this.$refs.formLogin.$emit('submit');
    },
    signUp() {
      this.register({
        email: this.email,
        username: this.username,
        password: this.password,
      });
    },
    ...userActions(['register']),
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
};
</script>
