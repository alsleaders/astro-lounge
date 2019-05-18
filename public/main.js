let missionName = []
let missionLocation = []
let missionDetails = []
let index = 0

// api fetches
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
        missionName.push(mission)
        // console.log(mission.launch_site.site_name_long)
        // missionLocation.push(missions.launch_site)
        // missionDetails.push(missions.details)
        document.querySelector('.mission-name').textContent =
          mission.mission_name
        document.querySelector('.mission-location').textContent =
          mission.launch_site.site_name_long
        document.querySelector('.mission-info').textContent = mission.details
      })

      // console.log(missionName)
      // console.log(missions[0].launch_site.site_name_long)
      // console.log(missions[0].details)
      // document.querySelector('.mission-name').textContent =
      //   missions[0].mission_name
      // document.querySelector('.mission-location').textContent =
      //   missions[0].launch_site.site_name_long
      // document.querySelector('.mission-info').textContent = missions[0].details
    })
}
// timer logic
// const theFinalCountdown = () => {
//   // get utc data from fetch
//   // do math
//   //
// }

// make the first slide
const firstUpcomingLaunch = () => {
  document.querySelector('.mission-name').textContent = missionName[index]
  console.log(missionName[index])
  document.querySelector('.mission-location').textContent =
    missionLocation[index]
  console.log(missionLocation[index])
  document.querySelector('.mission-info').textContent = missionDetails[index]
  console.log(missionDetails[index])
}

// make the buttons work

const main = () => {
  goGetTheImage()
  goGetLaunchData()
  firstUpcomingLaunch()
}
document.addEventListener('DOMContentLoaded', main)
