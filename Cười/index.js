alert('Hello,My name is Thanh.I'm not 18 years old:))))');


var user;

var is_logged_in;


$(function() {
    
   
   $('#sign_up').click(function(){
    var name = $('#name').val();
   var password =  $('#password').val();
      signUpUser(name,password);
      
   });
   
    $('#sign_in').click(function(){
    var name = $('#name').val();
   var password =  $('#password').val();
       signIn(name,password);
   });
   

   
    $('#sign_up_form').click(function(){
          statusColor('black');
      $('#status').text('Connect with devs today :)');
      loadForm();  
      $('#chartContainer').hide();
   });
   
   $('#cancel').click(function(){
     cancel(); 
       $('#chartContainer').show();
   });

});

function signUp(email,password){
     refreshServerTime();
     $('#status').text('connecting...');
      statusColor('black');
    firebase.auth().createUserWithEmailAndPassword(email+'@gmail.com', password).then(function(result) {
        user = email;
        var address = user.split('@');
       
        var ref = firebase.database().ref('status/');
        ref.child(address[0]).set(0);
        $('#status').text('Sign up success sign in with email address '+ user);
      statusColor('green');
       
            
        }).catch(function(error) {
          
            $('#status').text('Error: '+ error);
              statusColor('red');
        });
    
}

function signIn(email,password){
    $('#status').text('connecting...');
      statusColor('black');
    firebase.auth().signInWithEmailAndPassword(email+'@gmail.com', password).then(function(result){
          logged_in = true;  
         user = email;
        login();
        }).catch(function(error) {
            
         
         $('#status').text(error);
              statusColor('red');
          
        });
}
function signUpUser(user_name,password){
    refreshServerTime();
    var region = $('#regions').find(':selected').text().toString();
    
    if(region == 'select'){
     $('#status').text('Please select a region');  
      statusColor('red');
    }else{
     refreshServerTime();
   
     try{
    signUp(user_name,password);
    
     addRegion(region);
    $('#status').text('Account Created. Sign in as '+ user_name);
     statusColor('green');
  
    }catch(e){
         $('#status').text('A problem occured!');
          statusColor('red');
        console.log('error:'+ e);
    }   
    }
     
}


function loadForm(){
   $('#name').val('');
   $('#password').val('');
 $('#signin_form').show();  
}

function cancel(){
  $('#signin_form').hide();
  
}


 function refreshServerTime() {        
        firebase.database().ref("/.info/serverTimeOffset").on('value', function(offset) {
            var offsetVal = offset.val() || 0;
            serverTime = Date.now() + offsetVal;
        });
}




function login(){
   cancel(); 
   
   $('body').css('background-image','url(https://www.whatsapp.com/img/m2/background.png)');
   
    $('#chartContainer').hide();
 $('#sign_up_form').hide();
 $('#heading').val('Code Tips.io');
 



 var button8 = document.createElement('button');
 button8.setAttribute('id','sign_out');
 button8.setAttribute('class','btn');
 var node8 = document.createTextNode('Sign Out');
 button8.appendChild(node8);
 button8.addEventListener('click',signOut);
 $('#title').append(button8); 

var div = document.createElement('div');
 div.setAttribute('id','container');
 div.setAttribute('align','center');



  
 
 var footer = document.createElement('div');
 footer.setAttribute('id','footer');
  footer.setAttribute('align','center');
 
 
var input = document.createElement('input');
input.setAttribute('id','field');
input.setAttribute('type','text');
input.setAttribute('maxlength','20');
footer.append(input);

 var send = document.createElement('button');
 send.setAttribute('id','send');
 var text = document.createTextNode('Send');
 send.appendChild(text);
 send.addEventListener('click',function(){
     
 var message = $('#field').val();
 addMsg(user,message);
 $('#field').val('');
  


});
 footer.append(send);

$('body').append(footer);
 

 
 
 document.getElementById('body').append(div);
  
try{
 loadMessages();   
}catch(e){
  console.log(e);  
}

 
}

function signOut(){
    
        firebase.auth().signOut().then(function() {
            cancel(); 
      $('#chartContainer').show();
     $('#container').remove();
     $('#log_in_page').show();
     $('#sign_out').remove();
      $('#footer').remove();
      $('#sign_up_form').show();
      $('#heading').val('Welcome to Code Tips.io');
      $('body').css('background-image','url()');
      logged_in = false;
  
            }).catch(function(error) {
           
            alert('something went wrong');
        });    
       

}





window.onload = function () {
    //very uneconomical future fix coming soon
     var ref = firebase.database().ref('regions/Asia'); 
       ref.on('value', function(snapshot) {
        users[0] = snapshot.val();
        refreshChart();
        console.log('Asian users '+ users[0]);
      });
      
     var ref = firebase.database().ref('regions/Africa'); 
       ref.on('value', function(snapshot) {
        users[1] = parseInt(snapshot.val());
       
         refreshChart();
         console.log('African users '+ users[1]);
      });
      
       var ref = firebase.database().ref('regions/North America'); 
       ref.on('value', function(snapshot) {
        users[2] = parseInt(snapshot.val());
      
        refreshChart();
         console.log('North American users '+ users[2]);
        
      });
      
       var ref = firebase.database().ref('regions/South America'); 
       ref.on('value', function(snapshot) {
        users[3] = snapshot.val();
        refreshChart();
         console.log('South American users '+ users[3]);
      });
      
       var ref = firebase.database().ref('regions/Antarctica'); 
       ref.on('value', function(snapshot) {
        users[4] = snapshot.val();
        refreshChart();
         console.log('Antarctican users '+ users[4]);
      });
      
      
       var ref = firebase.database().ref('regions/Europe'); 
       ref.on('value', function(snapshot) {
        users[5] = snapshot.val();
        refreshChart();
         console.log('European users '+ users[5]);
      });
      
       var ref = firebase.database().ref('regions/Australia'); 
       ref.on('value', function(snapshot) {
        users[6] = parseInt(snapshot.val());
        refreshChart();
         console.log('Australian users '+ users[6]);
        
      });
      
     
     


}

function statusColor(color){
  $('#status').css('color',color);
}





function refreshChart(){
  
var chart = new CanvasJS.Chart("chartContainer", {
    theme: "light1", // "light2", "dark1", "dark2"
    animationEnabled: true, // change to true        
    title:{
        text: "Coders By Region"
    },
    data: [
    {
        // Change type to "bar", "area", "spline", "pie",etc.
        type: "column",
        dataPoints: [
            { label: "Asia",  y: users[0]  },
            { label: "Africa", y: users[1]  },
            { label: "North America", y: users[2]  },
            { label: "South America",  y: users[3]  },
            { label: "Antarctica",  y: users[4]  },
            { label: "Europe",  y: users[5]  },
            { label: "Australia",  y: users[6]  }
            
        ]
    }
    ]
});
chart.render();
$('#chart-status').remove();
}
    

function addMsg( user, newMsg) {
    
      var newPostKey = firebase.database().ref().child('messages').push().key;
      
      refreshServerTime();
      
      firebase.database().ref('messages/' + serverTime).set({
        postKey: newPostKey,
        priority: Date.now(),
        username: user,
        message: newMsg
      });
      
    }
    
function loadMessages(){
    refreshServerTime();
    var getMessageKey = firebase.database().ref('messages/').orderByChild("priority");
      getMessageKey.on('value', function(snapshot){
           $('#container').empty();
         
            snapshot.forEach(function(child) {
               var msg = child.val().message;
               var user_name = child.val().username;
               var message_body = document.createElement('div');
               message_body.setAttribute('id','added_message');
               var br = document.createElement('br');
               var node = document.createTextNode(user_name + ':'+ msg);
               message_body.appendChild(node);
               $('#container').append(message_body);
                  $('#container').append(br);
                   document.getElementById('container').scrollTop = document.getElementById('container').scrollHeight;
      parent.scrollTop = parent.scrollHeight;
           });
           
         
               
          
               
          
      });
          
}

function addRegion(region){
    var ref = firebase.database().ref('regions/'+region);
    ref.transaction(function(n) {
   return n + 1;
});
}



               





