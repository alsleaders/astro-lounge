let spaceXMissions = []
let index = 0
let launchTime
let interval

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
      console.log(missions[index].launch_date_utc)
      spaceXMissions = missions
      firstUpcomingLaunch()
    })
}
// timer logic
const theFinalCountdown = () => {
  // get utc data from fetch
  console.log(spaceXMissions[index].launch_date_utc)
  launchTime =
    Date.parse(spaceXMissions[index].launch_date_utc) - Date.parse(new Date())
  if (launchTime <= 0) {
    clearInterval(interval)
    document.querySelector('.mission-countdown').textContent =
      'Mission Launched!'
  }
  console.log(launchTime)
  interval = setInterval(() => {
    launchTime -= 1
    console.log(launchTime)
    if (launchTime <= 0) {
      clearInterval(interval)
      document.querySelector('.mission-countdown').textContent =
        'Mission Launched!'
    }

    const days = Math.floor(launchTime / (60 * 60 * 24))
    const hours = Math.floor((launchTime / (60 * 60)) % 24)
    const mins = Math.floor(launchTime / 60)
    const secs = launchTime - mins * 60
    console.log(mins, secs)
    document.querySelector('.mission-countdown').textContent =
      days + ' days ' + hours + ':' + mins + ':' + secs
  }, 1000)
}

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
  index++
  firstUpcomingLaunch()
  theFinalCountdown()
}

const previousSpaceXMission = () => {
  clearOldData()
  index--
  firstUpcomingLaunch()
  if (index < 0) {
    index = index.length
  }
  theFinalCountdown()
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
