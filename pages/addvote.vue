<template>

  <div>
    <v-snackbar top :timeout="5000" v-model="snackbarShowen">
      {{ msg }}
    </v-snackbar>

    <v-card class="mb-7" flat>
      <v-card-title>Create Poll</v-card-title>
      <v-card-subtitle>Input here</v-card-subtitle>
      <v-card-text>
        <v-textarea
          placeholder="Have a question ? Write it .."
          v-model="question"
          maxlength="255"
          rows="1"
          counter
          auto-grow
          solo
          flat
        />

        <v-flex v-show="choices.length" class="justify-center flex-wrap mb-2">
          <h4 class="d-inline-block mr-1">Choices :</h4>
          <v-chip
            v-for="(choice, i) in choices"
            @click:close="deleteChoice(i)"
            class="mx-1"
            :key="i"
            close
          >
            {{ choice }}
          </v-chip>
        </v-flex>

        <v-btn
          @click="createPoll"
          color="primary"
          class="mr-2"
          :loading="adding"
          depressed
        >
          Create Poll
        </v-btn>
        <v-btn
          @click="showChoices = true"
          color="primary"
          style="background: #fce5ed"
          text
        >
          Add Choice
        </v-btn>
      </v-card-text>
    </v-card>

    <v-dialog v-model="showChoices">
      <v-card>
        <v-card-title>Add Choice</v-card-title>
        <v-card-text>
          <form @submit.prevent="addChoice">
            <v-text-field
              v-model="choice"
              label="Choice"
              maxlength="20"
              counter
            />
            <v-btn type="submit" color="primary" class="mr-2" depressed>
              Add Choice
            </v-btn>
            <v-btn
              @click="showChoices = false"
              color="primary"
              style="background: #fce5ed"
              text
            >
              Close
            </v-btn>
          </form>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import api from "../service/api";
import "bootstrap/dist/css/bootstrap.min.css";
import  firestore  from "firebase/compat/app"
import 'bootstrap/dist/css/bootstrap.min.css'
import "firebase/compat/firestore"
import { vuexfireMutations, firestoreAction } from "vuexfire"
import db from "~/service/firebase"
export default {
  name: "addvote",
   data: () => ({
    question: "",
    choice: "",
    choices: [],
    msg: "",
    showChoices: false,
    snackbarShowen: false,
    adding: false
  }),
  methods: {
    async createPoll() {
      if (this.question && this.choices.length >= 2) {
        this.adding = true
        console.log("addd",this.$store.state)
        const poll = {
          authorId: this.$store.state.user.uid,
          author: this.$store.state.user.displayName,
          question: this.question,
          choices: this.choices,
          createdAt: firestore.firestore.FieldValue.serverTimestamp(),
        }

        api.create(poll)
          .then(() => {
            this.adding = false
            this.question = ""
            this.choices = []
          })
          .catch(() => {
            this.msg = "There was an Error while adding the Poll"
            this.snackbarShowen = true
            this.adding = false
          })
      } else {
        this.msg = "Please enter a valid Poll data"
        this.snackbarShowen = true
      }
    },
     addChoice() {
      this.choices.push(this.choice.trim())
      this.choice = ""
      this.showChoices = false
    },
    deleteChoice(i) {
      this.choices = this.choices.filter((choice, index) => index !== i)
    },
    savePoll() {
      var data = {
        title: this.poll.title,
        description: this.poll.description,
        published: false,
      };
      api
        .create(data)
        .then(() => {
          console.log("Created new item successfully!");
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },
    newPoll() {
      this.submitted = false;
      this.poll = {
        title: "",
        description: "",
        published: false,
      };
    },
  },
  action:{
    bindPolls: firestoreAction(({ bindFirestoreRef }) => {
      return bindFirestoreRef(
        "polls",
        db.firestore().collection("polls").orderBy("createdAt", "desc")
      )
    }),
    bindVotes: firestoreAction(({ state, bindFirestoreRef }) => {
      return bindFirestoreRef(
        "votes",
        db.firestore()
          .collection("users")
          .doc(state.user.uid)
          .collection("votes")
      )
    })
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
.mb-7.v-card.v-card--flat.v-sheet.theme--light {
    background: beige;
    border-radius: 22px;
    margin-top: 30px;
}
</style>