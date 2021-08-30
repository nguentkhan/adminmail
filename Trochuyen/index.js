var firebaseConfig = {
    apiKey: "AIzaSyDdjSm3UhHAT0YmakG-MKjfsbCFF3BTnnk",
    authDomain: "trochuyen-67032.firebaseapp.com",
    projectId: "trochuyen-67032",
    storageBucket: "trochuyen-67032.appspot.com",
    messagingSenderId: "318150959454",
    appId: "1:318150959454:web:eca2204ac8c9f2355befcf"
  };
firebase.initializeApp(firebaseConfig);

const db = firebase.database ();

const username = prompt("Làm ơn nhập nick name của bạn :)))");

document.getElementById("message-form").addEventListener("submit", sendMessage);

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

const fetchChat = db.ref("messages/");

fetchChat.on("child_added", function (snapshot) {
  const messages = snapshot.val();
  const message = `<li class=${
    username === messages.username ? "sent" : "receive"
  }><span>${messages.username}: </span>${messages.message}</li>`;
  // append the message on the page
  document.getElementById("messages").innerHTML += message;
});
