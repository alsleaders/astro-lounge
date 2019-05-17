// const theFinalCountdown = () => {
//   // get utc data from fetch
//   // do math
//   //
// }

const goGetTheImage = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
    .then(response => {
      return response.json()
    })
    .then(message => {
      console.log(message)
      console.log(message.url)
      document.querySelector('.picture-of-the-day').style.backgroundImage =
        'url(' + message.url + ')'
      document.querySelector('.copyright').textContent = message.copyright
      document.querySelector('.image-title').textContent = message.title
    })
}

const goGetLaunchData = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/SpaceX/launches/upcoming')
    .then(response => {
      return response.json()
    })
    .then(missions => {
      console.log(missions)
      document.querySelector('.mission-name').textContent =
        missions[0].mission_name
      document.querySelector('.mission-location').textContent =
        missions[0].launch_site.site_name_long
      document.querySelector('.mission-info').textContent = missions[0].details
    })
}
const main = () => {
  goGetTheImage()
  goGetLaunchData()
}
document.addEventListener('DOMContentLoaded', main)
