<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card class="logo py-4 d-flex justify-center">
        <NuxtLogo />
        <VuetifyLogo />
      </v-card>
       <!-- Latest Polls -->
    <h1 class="grey--text text--darken-3 mb-3">Latest Polls</h1>
    <p
      v-if="!$store.state.polls.length"
      class="display-1 text-center text-uppercase grey--text"
    >
      There are no polls right now...
    </p>
    <!-- <Poll v-for="poll in $store.state.polls" :key="poll.id" :poll="poll" /> -->
    </v-col>
  </v-row>
</template>

<script>
import Poll from "../pages/poll.vue"
import AddPoll from "../pages/addvote.vue"
export default {
  name: 'IndexPage',
  components: { Poll, AddPoll },
  mounted() {
    this.$store.dispatch("bindPolls")
    this.$store.dispatch("bindVotes")}
}
</script>