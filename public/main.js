let spaceXMissions = []
let index = 0
let now = new Date()
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
    Date.parse(spaceXMissions[index].launch_date_utc) - Date.parse(now)
  // say Launched if past
  if (launchTime <= 0) {
    clearInterval(interval)
    document.querySelector('.mission-countdown').textContent =
      'Mission Launched!'
  }
  console.log(launchTime)
  interval = setInterval(() => {
    launchTime -= 1
    console.log(launchTime)
    const days = Math.floor(launchTime / (1000 * 60 * 60 * 24))
    const hours = Math.floor((launchTime / (1000 * 60 * 60)) % 24)
    const mins = Math.floor(((launchTime / 1000) * 60) % 60)
    const secs = Math.floor((launchTime / 1000) * 60)
    console.log(mins, secs)
    document.querySelector('.mission-countdown').textContent =
      days + ' days ' + hours + ':' + mins + ':' + secs
  }, 1000)
  console.log(launchTime)
  if (launchTime <= 0) {
    clearInterval(interval)
    document.querySelector('.mission-countdown').textContent =
      'Mission Launched!'
  }
  // Timer needs to count even when not clicked
  // Timer needs to export in the right formatting
}

// make the buttons work
const nextSpaceXMission = () => {
  clearOldData()
  index++
  if ((index = spaceXMissions.length)) {
    index = 0
  }
  firstUpcomingLaunch()
  // theFinalCountdown() no, because this messes up when clicked
}

const previousSpaceXMission = () => {
  clearOldData()
  index--
  if (index < 0) {
    index = spaceXMissions.length - 1
  }
  console.log(index)
  firstUpcomingLaunch()
  // theFinalCountdown() no, because this messes up when clicked
}

// make the first slide
const firstUpcomingLaunch = () => {
  console.log(spaceXMissions[index])
  document.querySelector('.mission-name').textContent =
    spaceXMissions[index].mission_name
  document.querySelector('.mission-location').textContent =
    spaceXMissions[index].launch_site.site_name_long
  // document.querySelector('.mission-info').textContent =
  //   spaceXMissions[index].details
  // if ((spaceXMissions[index].details = '')) {
  //   document.querySelector('.mission-info').textContent =
  //     'No description available yet'
  // } else {
  document.querySelector('.mission-info').textContent =
    spaceXMissions[index].details

  document.querySelector('.mission-countdown').textContent =
    spaceXMissions[index].launch_date_utc
}

// clear out old slides
const clearOldData = () => {
  document.querySelector('.mission-name').textContent = ''
  document.querySelector('.mission-location').textContent = ''
  document.querySelector('.mission-info').textContent = ''
  document.querySelector('.mission-countdown').textContent = ''
}

const main = () => {
  goGetTheImage()
  goGetLaunchData()
  firstUpcomingLaunch()
  theFinalCountdown()
}

document.addEventListener('DOMContentLoaded', main)
document
  .querySelector('.left-arrow-button')
  .addEventListener('click', previousSpaceXMission)
document
  .querySelector('.right-arrow-button')
  .addEventListener('click', nextSpaceXMission)
