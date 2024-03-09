const KEY = "eab8ad5c73df79e46e057ed92329cc16";

const getWeather = async (city) => {
  return await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`
  )
    .then((res) => res.json())
    .then((result) => {
      return result;
    });
};
