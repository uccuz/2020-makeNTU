const express = require('express')
const app = express()

var humiditys = [80,60,40,20];

app.listen(80, () => {
  console.log('server running on port 80')
})

app.get('/', humidity)

/*app.get("/",function(req,res){
    humidity();
    console.log("a connect!!");
    res.send("hi");
});*/

function humidity(req,res) {

    let spawn = require("child_process").spawn
  
    let process = spawn('python', [
      "./comHumidity.py"
    ])

    process.stdout.on('data', (data) => {
      //const parsedString = JSON.parse(data);
      console.log(JSON.parse(data));
      
      humiditys[0] = JSON.parse(data)[0];
      res.send(JSON.parse(data)[1].toString());
    })
  } 