<?php

require_once 'getRandomWeatherAPIKey.php';

require_once('C:/Windows/System32/vendor/autoload.php');
$client = new \GuzzleHttp\Client(array( 'curl' => array( CURLOPT_SSL_VERIFYPEER => false, ), ));

if ($_POST['act'] == 'short') {
  $response = $client->request('GET', 'https://api.tomorrow.io/v4/weather/realtime?location="'.$_POST['lat'].','.$_POST['lon'].'"&apikey='.getAPI().'', [
    'headers' => [
      'accept' => 'application/json',
    ],
  ]);
  
  $full = $response->getBody();
  echo $full;
} else {
if ($_POST['act'] == 'getWeather') {
  try {
    $response = $client->request('POST', 'https://api.tomorrow.io/v4/timelines?apikey='.getAPI().'', [
      'body' => '{"location":"'.$_POST['lon'].','.$_POST['lat'].'","fields":["temperature","temperatureApparent","humidity","windSpeed","windDirection","precipitationProbability","sunriseTime","sunsetTime","visibility","cloudCover","moonPhase","uvIndex","fireIndex","temperatureMax","temperatureMin","windGust","epaHealthConcern","weatherCodeFullDay", "weatherCode","pressureSurfaceLevel"],"units":"metric","timesteps":["1d","1h"],"startTime":"nowPlus3h","endTime":"nowPlus339h"}',
      'headers' => [
        'Accept-Encoding' => 'gzip',
        'accept' => 'application/json',
        'content-type' => 'application/json',
      ],
    ]);
  } catch (\GuzzleHttp\Exception\RequestException $e) {
    $response = $client->request('POST', 'https://api.tomorrow.io/v4/timelines?apikey='.getAPI().'', [
      'body' => '{"location":"'.$_POST['lat'].','.$_POST['lon'].'","fields":["temperature","temperatureApparent","humidity","windSpeed","windDirection","precipitationProbability","sunriseTime","sunsetTime","visibility","cloudCover","moonPhase","uvIndex","fireIndex","temperatureMax","temperatureMin","windGust","epaHealthConcern","weatherCodeFullDay", "weatherCode","pressureSurfaceLevel"],"units":"metric","timesteps":["1d","1h"],"startTime":"nowPlus3h","endTime":"nowPlus339h"}',
      'headers' => [
        'Accept-Encoding' => 'gzip',
        'accept' => 'application/json',
        'content-type' => 'application/json',
      ],
    ]);
  }

  try {
    $current = $client->request('GET', 'https://api.tomorrow.io/v4/weather/realtime?location="'.$_POST['lat'].','.$_POST['lon'].'"&apikey='.getAPI().'', [
      'headers' => [
        'accept' => 'application/json',
      ],
    ]);
  } catch (\GuzzleHttp\Exception\RequestException $e) {
    $current = $client->request('GET', 'https://api.tomorrow.io/v4/weather/realtime?location="'.$_POST['lon'].','.$_POST['lat'].'"&apikey='.getAPI().'', [
      'headers' => [
        'accept' => 'application/json',
      ],
    ]);
  }
    
  $current = $current->getBody();
  $result = $response->getBody();

  $full = array(
      'current'=>json_decode($current),
      'dayhour'=>json_decode($result)
  );

  echo json_encode($full);
} else {

  $trans = $client->request('POST', 'https://deep-translate1.p.rapidapi.com/language/translate/v2', [
    'body' => '{
      "q": "'.$_POST['city'].'",
      "source": "en",
      "target": "ru"
    }',
    'headers' => [
      'X-RapidAPI-Host' => 'deep-translate1.p.rapidapi.com',
      'X-RapidAPI-Key' => '79ec5a07bcmsh6a16e4141e0b854p17f427jsn909e476999ce',
      'content-type' => 'application/json',
    ],
]);
$translated = $trans->getBody();
echo $translated;

}
}

?>