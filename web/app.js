var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var weather = require('openweather-apis');
weather.setLang('en');

var tem = 20;
var des="sunny";


var clothing = [
    {id:1, humidity:25, timeStarted:"0", timeRemaining:5, onOff:1},
    {id:2, humidity:32, timeStarted:"0", timeRemaining:2, onOff:1},
    {id:3, humidity:15, timeStarted:"0", timeRemaining:6, onOff:1},
    {id:4, humidity:18, timeStarted:"02:05 18/06/2020", timeRemaining:3, onOff:1},
];

var zone = "Taipei";
weather.setCity(zone);
//這裡要設置apiKey
var apiKey = "";
weather.setAPPID(apiKey);

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");

app.get("/", function(req,res){
    let spawn = require("child_process").spawn

    let process = spawn('python', [
        "./getHumidity.py"
    ])

    process.stdout.on('data', (data) => {
        //const parsedString = JSON.parse(data);
        console.log(JSON.parse(data));
        clothing[0].humidity = JSON.parse(data)[0];
        clothing[1].humidity = JSON.parse(data)[1];
        clothing[2].humidity = JSON.parse(data)[2];
        clothing[3].humidity = JSON.parse(data)[3];

        weather.getTemperature(function(err, temp){
            weather.getDescription(function(err, desc){
                console.log(desc);
                console.log(temp);
                des = desc;
                tem = temp;
                res.render("index", {clothing:clothing,zone:zone,tem:parseInt(temp),des:desc});
            });
        });
    })



    
});

app.get("/user", function(req,res){
    res.render("user", {clothing:clothing});
});

app.get("/info/:id", function(req, res){
    remainUpdate();
    res.render("info", {clothing:clothing[req.params.id - 1]});
});

app.post("/setZone",function(req,res){
    zone = req.body.zone;
    weather.setCity(zone);


    res.redirect("/");
});

/*function weatherUpdate(){
    weather.getTemperature(function(err, temp){
        console.log(temp);
        tem = parseInt(temp);
    });
    weather.getDescription(function(err, desc){
        console.log(desc);
        des = desc;
    });
    return;
}*/

function remainUpdate(){
    clothing.forEach(function(cloth){
        if(cloth.onOff == 1){
            cloth.timeRemaining = parseInt(cloth.humidity * (28 - tem) * 0.04);
        }
    });
}

app.listen(80,function(){
    console.log("listen on port 80");
});