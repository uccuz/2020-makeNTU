var weather = require('openweather-apis');

weather.setLang('zh_tw');

//Taipei
//Taichung
//Kaohsiung
weather.setCity('Taipei');

//這裡要設置apiKey
var apiKey = "";


weather.setAPPID(apiKey);

// get the Description of the weather condition
weather.getDescription(function(err, desc){
    console.log(desc);
});

weather.getTemperature(function(err, temp){
    console.log(temp);
});