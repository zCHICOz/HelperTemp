let imgNight = 'https://images.unsplash.com/photo-1488866022504-f2584929ca5f?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1343&q=80'
const proxyUrl = 'https://cors-anywhere.herokuapp.com/'

navigator.geolocation.getCurrentPosition(position => {
  searchClimate(position.coords.latitude, position.coords.longitude)
})

function insertInHTML(json) {
  $('#name-city').html(json.results.city)
  $('#graus').html(json.results.temp)
  $('#description').html(json.results.description)

  $('#humidity').html(`<i class="fas fa-tint"></i> ${json.results.humidity}%`)
  $('#wind').html(`<i class="fas fa-wind"></i> ${json.results.wind_speedy}`)

  $('#day-01').html(`${json.results.forecast[1].weekday}°C`)
  $('#day-02').html(`${json.results.forecast[2].weekday}°C`)
  $('#day-03').html(`${json.results.forecast[3].weekday}°C`)

  $('#max-01').html(`Max: ${json.results.forecast[1].max}°C`)
  $('#max-02').html(`Max: ${json.results.forecast[2].max}°C`)
  $('#max-03').html(`Max: ${json.results.forecast[3].max}°C`)

  $('#min-01').html(`Min: ${json.results.forecast[1].min}°C`)
  $('#min-02').html(`Min: ${json.results.forecast[2].min}°C`)
  $('#min-03').html(`Min: ${json.results.forecast[3].min}°C`)
}

function searchClimate(latitude, longitude) {   
  const baseUrl = `https://api.hgbrasil.com/weather?key=09ca2405&lat=${latitude}&lon=${longitude}&user_ip=remote`

  fetch(proxyUrl + baseUrl)
    .then(res => res.json())
    .then(json => {
      json.results.currently === 'noite' ? $('.card-container').css('background-image', `url(${imgNight})`) : null
      insertInHTML(json)

      $('.message-container').css('display', 'none')
      $('.info-main').css('display', 'flex')
      $('.cards-next-days').css('display', 'flex')
    })
    .catch(err => console.log('Problema ao buscar dados: ', err))
}

function searchCityName(name, state) {
  fetch(proxyUrl + `https://api.hgbrasil.com/weather?key=09ca2405&city_name=${name},${state}`)
    .then(res => res.json())
    .then(json => {
      json.results.currently === 'noite' ? $('.card-container').css('background-image', `url(${imgNight})`) : null
      insertInHTML(json)

      $('.message-container').css('display', 'none')
      $('.info-main').css('display', 'flex')
      $('.cards-next-days').css('display', 'flex')
    })
    .catch(err => console.log('Problema ao buscar dados: ', err))
}

const submit = document.querySelector('[wm-submit]')
submit.onclick = function(e) {
  e.preventDefault()

  const form = e.target.parentNode
  const city = form.city.value.replace(/ /g, "-")
  const state = form.state.value

  searchCityName(city.toLowerCase(), state.toLowerCase())
}