const axios = require('axios');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the "public" directory
app.use(express.static(__dirname + '/public'));

async function getWeatherData(city) {
  const apiKey = '336c3ee53cf346c78a7165856233105';
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}


app.get('/', async (req, res) => {
    const city = req.query.city;
    console.log(city);
    if (city){
      try {
        const weatherData = await getWeatherData(city);
        res.render('page', {
            city: city,
            weatherData: weatherData,
            error: null
        });
      } catch (error) {
          console.log(error);
          res.render('page', {
              city: null,
              weatherData: null,
              error: 'Error, please try again'
          });
      }
    }else{
      console.log('No city entered');
      res.render('page', {
          city: null,
          weatherData: null,
          error: null
      });
    }
    
});

//start the server and listen for incoming requests:
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
  
/*
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question('Enter a city: ', async (city) => {
  const weatherData = await getWeatherData(city);
  if (weatherData) {
    console.log(`Weather in ${city}:`);
    console.log(`Temperature: ${weatherData.current.temp_c}°C`);
    console.log(`Condition: ${weatherData.current.condition.text}`);
  }
  readline.close();
});
*/
