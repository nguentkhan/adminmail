//alert(' w.i.p, codepen does not support google and facebook login, therfore only use "sign in anonimously"');

document.addEventListener('DOMContentLoaded', function() {
  let   messagesList = document.getElementById('messages'),
        textInput = document.getElementById('text'),
        sendButton = document.getElementById('send'),
        googleLogin = document.getElementById('google'),
        facebookLogin = document.getElementById('facebook'),
        anonLogin = document.getElementById('anonLogin'),
        logout = document.getElementById('logout'),
        usernameElm = document.getElementById('username'),
        username = "notLoggedUser",
        uploader = document.getElementById('uploader');

  const config = {
        apiKey: "AIzaSyBgt4PG2En6zANLNpuDegB_pjNQDk_rRGM",
  authDomain: "quantrilogin.firebaseapp.com",
  projectId: "quantrilogin",
  storageBucket: "quantrilogin.appspot.com",
  messagingSenderId: "888154511280",
  appId: "1:888154511280:web:c3e01663022e6956b66875"
    };

    // init firebase app
    const app = firebase.initializeApp(config);
    const database = app.database();
    const auth = app.auth();
    const storage = app.storage();
    const databaseRef = database.ref().child('chat');

    sendButton.addEventListener('click', function() {
        let chat = {
            name: username,
            message: textInput.value
        };
        databaseRef.push().set(chat);
        textInput.value = '';
    });
    
    databaseRef.on('child_added', snapshot => {
        let chat = snapshot.val();
        addMessage(chat);
    });

    googleLogin.addEventListener('click', function(e) {
        let provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider).then(function(result) {
            let token = result.credential.accessToken;
            let user = result.user;
        }).catch(function(error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            let email = error.email;
            let credential = error.credential;
        });
    });

    facebookLogin.addEventListener('click', function(e) {
        let provider = new firebase.auth.FacebookAuthProvider();
        auth.signInWithPopup(provider).then(function(result) {
            let token = result.credential.accessToken;
            let user = result.user;
        }).catch(function(error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            let email = error.email;
            let credential = error.credential;
        });
    });

    anonLogin.addEventListener('click', function(e) {
        auth.signInAnonymously().catch(function(error) {
            let errorCode = error.code;
            let errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    });

    logout.addEventListener('click', function(e) {
        auth.signOut();
    });

    auth.onAuthStateChanged(user => {
        if (user) {
            if (user.isAnonymous) {
                setUsername('anon');
            } else {
                setUsername(user.displayName);
            }
        } else {
            setUsername("notLoggedUser");
        }
    });

  function handleFileSelect(e) {
    let file = e.target.files[0];
    let storageRef = storage.ref().child('chat_photos');
    let photoRef = storageRef.child(file.name);
    let uploadTask = photoRef.put(file);
    uploadTask.on('state_changed', null, null, function() {
      let downloadUrl = uploadTask.snapshot.downloadURL;
      textInput.value = downloadUrl;
    });
  }
  file.addEventListener('change', handleFileSelect, false);
  
  
    function setUsername(newUsername) {
        if (newUsername == null) {
            newUsername = "notLoggedUser";
        }
        username = newUsername;
        let isLoggedIn = username != 'notLoggedUser';     
        usernameElm.innerText = newUsername;
        usernameElm.style.fontWeight= "bold";
        
        logout.style.display = isLoggedIn ? '' : 'none';
        facebookLogin.style.display = isLoggedIn ? 'none' : '';
        googleLogin.style.display = isLoggedIn ? 'none' : '';
        anonLogin.style.display = isLoggedIn ? 'none' : '';
    }

    function addMessage(chat) {
        let li = document.createElement('li');
        let nameElm = document.createElement('h4');
        nameElm.innerText = chat.name;
        li.appendChild(nameElm);
        li.className = 'highlight';
        if (chat.message.indexOf("https://firebasestorage.googleapis.com/") == 0 ||
            chat.message.indexOf("https://lh3.googleusercontent.com/") == 0 ||
            chat.message.indexOf("https://pbs.twimg.com/") == 0 ||
            chat.message.indexOf("data:image/") == 0) {
            let imgElm = document.createElement("img");
            imgElm.src = chat.message;
            li.appendChild(imgElm);
        } else {
            let messageElm = document.createElement("span");
            messageElm.innerText = chat.message;
            li.appendChild(messageElm);
        }
        messagesList.appendChild(li);
        li.scrollIntoView(false);
        sendButton.scrollIntoView(false);
    };
    setUsername('notLoggedUser')
});


