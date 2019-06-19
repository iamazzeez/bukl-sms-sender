const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
var http = require("https");
const port = process.env.PORT || 5000;
app.use(cors())
app.use(bodyParser.json())



app.post('/', (request, response) => {

   console.log(request.body.sms.message)

   var options = {
    "method": "POST",
    "hostname": "api.msg91.com",
    "port": null,
    "path": "/api/v2/sendsms?country=91",
    "headers": {
      "authkey": "280314AmKDVfxXc6UC5cfdf599",
      "content-type": "application/json"
    }
  };


   var req = http.request(options, function (res) {
    var chunks = [];
  
    res.on("data", function (chunk) {
      chunks.push(chunk);
    });
  
    res.on("end", function () {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  console.log(request.body.sms.to)


req.write(JSON.stringify({ sender: 'SOCKET',
route: '4',
country: '91',
sms: 
 [ { message: request.body.sms.message, to: [request.body.sms.to] } ] }));

req.end();

response.send('success')

})


// req.write(JSON.stringify({ sender: 'SOCKET',
// route: '4',
// country: '91',
// sms: 
//  [ { message: 'Hello, offer is limited hurry up!', to: [ '8309595695', '9902932734'] } ] }));

app.listen(port, (err) => {
  if(err) console.log(err)
  console.log('server running on '+port)
})