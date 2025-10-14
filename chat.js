// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCQMjI8h89e0nZjM_FDk2YFf7HU58HtsNY",
  authDomain: "chatty-webb.firebaseapp.com",
  databaseURL: "https://chatty-webb-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "chatty-webb",
  storageBucket: "chatty-webb.firebasestorage.app",
  messagingSenderId: "915975948575",
  appId: "1:915975948575:web:71a42491e9cacf3758c82a",
  measurementId: "G-0WN6PMJ1R9"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref("messages");

// Load messages
db.on("child_added", (snapshot) => {
  const msg = snapshot.val();
  const div = document.createElement("div");
  div.innerHTML = `<b>${msg.name}:</b> ${msg.text}`;
  document.getElementById("chat-box").appendChild(div);
  div.scrollIntoView();
});

// Send message
function send() {
  const name = document.getElementById("name").value.trim();
  const msg = document.getElementById("msg").value.trim();
  if (name && msg && name.length <= 12 && msg.length <= 60) {
    db.push({ name, text: msg, timestamp: firebase.database.ServerValue.TIMESTAMP });
    document.getElementById("msg").value = "";
  }
}