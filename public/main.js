let spaceXMissions = []
let index = 0

// api fetches This is fine leave it alone
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
      console.log(missions[index].launch_site.site_name_long)
      console.log(missions[index].details)
      spaceXMissions = missions
      firstUpcomingLaunch()
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
  console.log(spaceXMissions[index])
  document.querySelector('.mission-name').textContent =
    spaceXMissions[index].mission_name
  document.querySelector('.mission-location').textContent =
    spaceXMissions[index].launch_site.site_name_long
  document.querySelector('.mission-info').textContent =
    spaceXMissions[index].details
  document.querySelector('.mission-countdown').textContent =
    spaceXMissions[index].launch_date_utc
  // document.querySelector('.mission-name').textContent = missionName[index]
  // console.log(missionLocation[index])
  // document.querySelector('.mission-location').textContent =
  //   missionLocation[index]
  // console.log(missionDetails[index])
  // document.querySelector('.mission-info').textContent = missionDetails[index]
}

// clear out old slides
const clearOldData = () => {
  document.querySelector('.mission-name').textContent = ''
  document.querySelector('.mission-location').textContent = ''
  document.querySelector('.mission-info').textContent = ''
  document.querySelector('.mission-countdown').textContent = ''
}

// make the buttons work
const nextSpaceXMission = () => {
  clearOldData()
  firstUpcomingLaunch()
  index++
}

const previousSpaceXMission = () => {
  clearOldData()
  firstUpcomingLaunch()
  index--
  if (index < 0) {
    index = index.length
  }
}
const main = () => {
  goGetTheImage()
  goGetLaunchData()
  firstUpcomingLaunch()
}

document.addEventListener('DOMContentLoaded', main)
document
  .querySelector('.left-arrow-button')
  .addEventListener('click', previousSpaceXMission)
document
  .querySelector('.right-arrow-button')
  .addEventListener('click', nextSpaceXMission)
