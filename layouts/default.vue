<template>
  <v-app dark>
    <v-app-bar fixed app>
        <v-btn :to="'/poll'">Home</v-btn>
        <v-btn :to="'/addvote'">Vote</v-btn>
        <v-spacer></v-spacer>
        <v-btn :to="'/login'">Login</v-btn>
        <v-btn :to="'/register'">Sign Up</v-btn>
        <v-btn @click="logout"> Log Out</v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import  auth  from "../service/firebase"
import 'firebase/compat/auth';

export default {
name: "DefaultLayout",
  data() {
    return {
      email:"",
      password:"",
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js",
    };
  },
  methods: {
    async logout() {
      try {
        localStorage.clear()
      } catch (error) {
        alert("Khong the LogOut!!!!");
      }
    },
  },
  created() {
    this.$store.dispatch("setUser")
  },
  mounted() {
    this.$store.dispatch("bindPolls")
    this.$store.dispatch("bindVotes")
    if (localStorage.getItem("user")) {
      this.signedIn = true
    }
    auth.auth().onAuthStateChanged(user => {
      if (user) {
        this.signedIn = true
        localStorage.setItem("user", JSON.stringify(user))
        if (this.$route.name !== "Home") this.$router.push("/")
      } else {
        this.signedIn = false
        localStorage.removeItem("user")
        if (this.$route.name === "Home") this.$router.push("/login")
      }
      this.$store.dispatch("setUser")
    })
  }
};
</script>
