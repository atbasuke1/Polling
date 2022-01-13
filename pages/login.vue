<template>
 <div>
    <v-card class="mx-5">
      <v-card-text class="pa-7">
        <h1 class="mb-7">Login</h1>

        <form @submit.prevent="login" ref="login">
          <v-text-field
            prepend-icon="mdi-email"
            :rules="emailRules"
            name="email"
          />
          <v-text-field
            prepend-icon="mdi-shield-lock"
            :rules="passwordRules"
            type="password"
            name="password"
          />
          <v-btn type="submit" color="primary" depressed large>
            Login
            <v-icon right>mdi-login</v-icon>
          </v-btn>
        </form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  name: "Login",
  data: () => ({
    emailRules: [
      v => !!v || "Email field can't be empty",
      v => {
        const regex = /^[a-z0-9-._]+@[a-z0-9-._]+$/gi
        return (!!v && regex.test(v.trim())) || "Enter a valid Email"
      }
    ],
    passwordRules: [v => !!v || "Password field can't be empty"]
  }),
  methods: {
    async login() {
      const { email, password } = this.$refs.login
      firebase
        .auth()
        .signInWithEmailAndPassword(email.value.trim(), password.value)
        .then(data => {
          console.log("user" , data);
          // localStorage.setItem("user", JSON.stringify(data.user.providerData));
          this.$router.push("/vote" );
        })
        .catch(err => {
          this.error = err.message;
        });
    }
  },
};
</script>

<style scoped>
.col-sm-8.col-md-4.col-12 {
  border: 1px solid #9e9e9e;
}
.v-card__text.pa-7 {
    background: beige;
    margin-top: 50px;
}
</style>
