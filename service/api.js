import firebase from "~/service/firebase";
const db = firebase.firestore().collection('polls');
// const db = firebase.database().ref('polling')

class TutorialDataService {
  getAll() {
    return db;
  }

  create(data) {
    console.log("Created  item successfully!",data);
    return db.add(data);
    // return db.push(data)
  }

  update(key, value) {
    return db.child(key).update(value);
  }

  delete(key) {
    return db.child(key).remove();
  }

  deleteAll() {
    return db.remove();
  }
}

export default new TutorialDataService();