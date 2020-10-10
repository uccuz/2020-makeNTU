const express = require('express')
const app = express()

var humiditys = [80,60,40,20];

app.listen(80, () => {
  console.log('server running on port 80')
})

app.get("/",function(req,res){
    humidity();
    console.log("a connect!!");
    res.send("hi");
});

function humidity() {

    let spawn = require("child_process").spawn
  
    let process = spawn('python', [
      "./comHumidity.py"
    ])

    process.stdout.on('data', (data) => {
      const parsedString = JSON.parse(data);
      console.log(JSON.parse(data)[0]);
      console.log(JSON.parse(data)[1]);
      console.log(JSON.parse(data)[2]);
      console.log(JSON.parse(data)[3]);
    })
  
  } 