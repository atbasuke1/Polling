<template>
  <div>
    <v-snackbar top :timeout="5000" v-model="snackbarShowen">
      {{ msg }}
    </v-snackbar>
    <v-card class="mb-3" flat>
      <v-card-title>
        {{ poll.author }}
        <v-spacer />
        <v-btn v-if="$store.state.user.uid === poll.authorId" icon>
          <v-menu transition="scale-transition">
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="remove">Delete Poll</v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </v-card-title>
      <v-card-subtitle>{{ poll.createdAt | date }}</v-card-subtitle>

      <v-card-text>
        <p>{{ poll.question }}</p>

        <Choice
          v-for="(choice, i) in poll.choices"
          @vote="vote(i)"
          :class="voted && votedOn === i ? 'active' : ''"
          :percent="(poll.votes[i]) * 100 || 0"
          :key="i"
        >
          {{ choice }}
        </Choice>
      </v-card-text>
      <p class="ma-0 px-5 pb-2 grey--text text--darken-2 text-right">
        Votes: {{ votes }}
      </p>
    </v-card>
  </div>
</template>

<script>
import Choice from "./Choice.vue"
import  functions  from "~/service/firebase"
import moment from "moment"

export default {
  name: "poll",
  components: { Choice },
  props: ["poll"],
  data: () => ({
    votedOn: null,
    snackbarShowen: false,
    msg: ""
  }),
  methods: {
    async vote(choice) {
      const vote = await functions.functions().httpsCallable("vote")
    // console.log("tesst",this.$props.poll)

      await vote({ choice, pollId: this.$props.poll.id })
    },
    remove() {
      db.collection("polls")
        .doc(this.$props.poll.id)
        .delete()
        .then(() => {
          this.msg = "Poll removed successfully"
          this.snackbarShowen = true
        })
    },
  }, mounted: function () {
    console.log("tesst", this.$props)
  },
  computed: {
    votes() {
      const { votes } = this.poll
      const result= votes.reduce((result, item) => result + item, 0)
      return result
    },
    voted() {

      return this.$store.state.votes.some(
        (vote) => vote.id === this.$props.poll.id
      )
    },
  },
  filters: {
    date: (v) => moment(v).format("d MMM YYYY, hh:mm a"),
  },
  updated() {
    if (this.voted) {
      const { choice } = this.$store.state.votes.find(
        (vote) => vote.id === this.$props.poll.id
      )
      this.votedOn = choice
    } else {
      this.votedOn = null
    }
  },
}
</script>
