var firebaseConfig = {
    apiKey: "AIzaSyDdjSm3UhHAT0YmakG-MKjfsbCFF3BTnnk",
    authDomain: "trochuyen-67032.firebaseapp.com",
    projectId: "trochuyen-67032",
    storageBucket: "trochuyen-67032.appspot.com",
    messagingSenderId: "318150959454",
    appId: "1:318150959454:web:eca2204ac8c9f2355befcf"
  };
firebase.initializeApp(firebaseConfig);

function sendMessage(e) {
  e.preventDefault();

  // get values to be submitted
  const timestamp = Date.now();
  const messageInput = document.getElementById("message-input");
  const message = messageInput.value;

  // clear the input box
  messageInput.value = "";

  //auto scroll to bottom
  document
    .getElementById("messages")
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

  // create db collection and send in the data
  db.ref("messages/" + timestamp).set({
    username,
    message,
  });
}

