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
      missions.forEach(mission => {
        console.log(mission.mission_name)
        console.log(mission.launch_site.site_name_long)
        document.querySelector('.mission-name').textContent =
          mission.mission_name
        document.querySelector('.mission-location').textContent =
          mission.launch_site.site_name_long
      })
    })
}
const main = () => {
  goGetTheImage()
  goGetLaunchData()
}
document.addEventListener('DOMContentLoaded', main)
