const express = require('express');
const https = require('https');
const app = express();
app.use(express.static("public"));
app.set('view engine', 'ejs');

app.use(express.urlencoded({extended: true}))

app.get("/", function (req, res){

  res.render('index');

});

// app.post("/", function (req, res){

//   const query = req.body.cityName;
      
//       // res.write("<h1>Tempreture in " + query.toUpperCase() + " is "+ temp +" dergree Celcius</h1>" + "<br><b>Weather Conditions: " + description + "</b>" );
//       // res.write('<div style="border: 1px solid grey; background-color: blue; width: 160px; height:100px "> <img src="' + imageURL + '"></div>');
//       // res.send();

//     });
//   });
// })
app.post("/", function (req, res){
  const query = req.body.cityName;
  
  const api_key = "df675cfdc682df49bb5b64f99752bfa7";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=metric&appid="+ api_key + "";

  https.get(url, function( response){
    console.log(response.statusCode);

    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      // console.log(weatherData);
      const temp = weatherData.main.temp;
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const humidity = weatherData.main.humidity;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      console.log(temp, description, humidity);
  

      res.render('weather-report' , {temp,description,humidity,imageURL});
    })
  })
      
  });

app.listen(process.env.PORT || 3000,function () {
  console.log("Server is running at port 3000");
});
