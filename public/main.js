let spaceXMissions = []
let index = 0
let today = new Date()
let now = today.getTime()
let timeUntilLaunch
let interval

// api fetches This is fine leave it alone
const goGetTheImage = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
    .then(response => {
      return response.json()
    })
    .then(message => {
      // console.log(message)
      // console.log(message.url)
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
      // console.log(missions)
      // console.log(missions[index].launch_site.site_name_long)
      // console.log(missions[index].details)
      // console.log(missions[index].launch_date_utc)
      spaceXMissions = missions
      firstUpcomingLaunch()
    })
}

// timer logic
const theFinalCountdown = () => {
  // console.log('liftoff')
  // get utc data from fetch
  let liftoff = spaceXMissions[index].launch_date_utc
  console.log(spaceXMissions)
  // console.log(now)
  // console.log(liftoff)
  timeUntilLaunch = liftoff - now
  // console.log(timeUntilLaunch)
  interval = setInterval(() => {
    interval = timeUntilLaunch -= 1
    updateCountdownClock()
    // console.log(timeUntilLaunch)
    if (timeUntilLaunch === 0 || timeUntilLaunch < 0) {
      clearInterval(interval)
      document.querySelector('.mission-countdown').textContent =
        'Mission Launched!'
    }
  }, 1000)
  // say Launched if past
  // if (timeUntilLaunch <= 0) {
  //   clearInterval(interval)
  // } else {
  //   console.log(timeUntilLaunch)
  //   interval = setInterval(() => {
  //     timeUntilLaunch -= 1
  //   })
  //   // Timer needs to count even when not clicked
  //   // Timer needs to export in the right formatting
  // }
}

const updateCountdownClock = () => {
  // console.log(timeUntilLaunch)
  let secs = Math.floor((timeUntilLaunch / 1000) % 60)
  let mins = Math.floor(((timeUntilLaunch / 1000) * 60) % 60)
  let hours = Math.floor((timeUntilLaunch / (1000 * 60 * 60)) % 24)
  let days = Math.floor(timeUntilLaunch / (1000 * 60 * 60 * 24))
  // console.log(mins, secs)
  document.querySelector('.mission-countdown').textContent =
    days +
    ' days, ' +
    hours +
    ' hours, ' +
    mins +
    ' minutes, ' +
    secs +
    ' seconds'
  // console.log(timeUntilLaunch)
  if (timeUntilLaunch <= 0) {
    clearInterval(interval)
    document.querySelector('.mission-countdown').textContent =
      'Mission Launched!'
  }
}

let updateHTML = setInterval(updateCountdownClock, 1000)
// make the buttons work
const nextSpaceXMission = () => {
  clearOldData()
  if (index > spaceXMissions.length - 2) {
    index = 0
  } else {
    index++
  }
  firstUpcomingLaunch()
  updateCountdownClock()
  // theFinalCountdown()
  // no, because this messes up when clicked
}

const previousSpaceXMission = () => {
  clearOldData()
  if (index > 0) {
    index--
  } else {
    index = spaceXMissions.length - 1
  }
  // console.log(index)
  firstUpcomingLaunch()
  updateCountdownClock()
  // theFinalCountdown() no, because this messes up when clicked
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
  // if ((spaceXMissions[index].details = '')) {
  //   document.querySelector('.mission-info').textContent =
  //     'No description available yet'
  // } else {
  //   document.querySelector('.mission-info').textContent =
  //     spaceXMissions[index].details
  // }
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
  updateCountdownClock()
  updateHTML()
}

document.addEventListener('DOMContentLoaded', main)
document.addEventListener('DOMContentLoaded', theFinalCountdown)
document
  .querySelector('.left-arrow-button')
  .addEventListener('click', previousSpaceXMission)
document
  .querySelector('.right-arrow-button')
  .addEventListener('click', nextSpaceXMission)
