import firebase from "firebase";
import "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC2KoqGWGew3elA__tHC9OO7klSjEdfP20",
  authDomain: "sandbox-bdc7b.firebaseapp.com",
  databaseURL: "https://sandbox-bdc7b.firebaseio.com",
  projectId: "sandbox-bdc7b",
  storageBucket: "sandbox-bdc7b.appspot.com",
  messagingSenderId: "983978754836",
  appId: "1:983978754836:web:9b5043ac00d727bf187801",
  measurementId: "G-FYHXM8QDFW",
};

class Fire {
  constructor(callback) {
    this.init(callback);
  }

  init(callback) {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch((error) => {
            callback(error);
          });
      }
    });
  }
  getLists(callback) {
    let ref = firebase
      .firestore()
      .collection("users")
      .doc(this.userId)
      .collection("lists");

    this.unsubscribe = ref.onSnapshot((snapshot) => {
      lists = [];

      snapshot.forEach((doc) => {
        lists.push({ id: doc.id, ...doc.data() });
      });

      callback(lists);
    });
  }

  get userId() {
    return firebase.auth().currentUser.uid;
  }

  detach() {
    this.unsubscribe();
  }
}

export default Fire;
