const accountSid = 'ACf546b0d66a095e00c57a29bbc6b5bd9b'; 
const authToken = '76d5dd2801fe274b31c02443885a9022'; 
const client = require('twilio')(accountSid, authToken); 
 
client.messages 
      .create({ 
         body: 'Oiue',  
         messagingServiceSid: 'MGbe22fb4bbe2897ea4173779d29a3fa21',      
         to: '+5521997025550' 
       }) 
      .then(message => console.log(message.sid)) 
      .done();