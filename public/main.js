let spaceXMissions = []
let index = 0
let today = new Date()
let now = today.getTime()
let timeUntilLaunch
let interval

// api fetches
const goGetTheImage = () => {
  fetch('https://sdg-astro-api.herokuapp.com/api/Nasa/apod')
    .then(response => {
      return response.json()
    })
    .then(message => {
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
      spaceXMissions = missions
      firstUpcomingLaunch()
    })
}

// after you read through this, will you tell me where my mistake is with the timer?
const firstUpcomingLaunch = () => {
  document.querySelector('.mission-name').textContent =
    spaceXMissions[index].mission_name
  document.querySelector('.mission-location').textContent =
    spaceXMissions[index].launch_site.site_name_long
  document.querySelector('.mission-info').textContent =
    spaceXMissions[index].details
  document.querySelector('.mission-countdown').textContent =
    spaceXMissions[index].launch_date_utc
  console.log(
    'You know time is completely arbitrary.  At least a calorie is the amount of energy it takes to raise a kg of water a degree C.  Time zones were made up to make sure people did not miss their trains in the late 1800s in the American West.  Just felt like I should mention that since I keep thinking about time and how it is flying by far less quickly than my timer would indicate.'
  )
  theFinalCountdown()
}

const theFinalCountdown = () => {
  let liftoff = Date.parse(spaceXMissions[index].launch_date_utc)
  timeUntilLaunch = liftoff - now
  interval = setInterval(() => {
    timeUntilLaunch -= 1000
    updateCountdownClock()
  })
}

const updateCountdownClock = () => {
  let secs = Math.floor((timeUntilLaunch / 1000) % 60)
  let mins = Math.floor(((timeUntilLaunch / 1000) * 60) % 60)
  let hours = Math.floor((timeUntilLaunch / (1000 * 60 * 60)) % 24)
  let days = Math.floor(timeUntilLaunch / (1000 * 60 * 60 * 24))
  console.log(mins, secs)
  document.querySelector('.mission-countdown').textContent =
    days +
    ' days, ' +
    hours +
    ' hours, ' +
    mins +
    ' minutes, ' +
    secs +
    ' seconds'
  if (timeUntilLaunch <= 0) {
    clearInterval(interval)
    document.querySelector('.mission-countdown').textContent =
      'Mission Launched!'
  }
}

const nextSpaceXMission = () => {
  clearOldData()
  if (index > spaceXMissions.length - 2) {
    index = 0
  } else {
    index++
  }
  firstUpcomingLaunch()
}

const previousSpaceXMission = () => {
  clearOldData()
  if (index > 0) {
    index--
  } else {
    index = spaceXMissions.length - 1
  }
  firstUpcomingLaunch()
}

// clear out old slides
const clearOldData = () => {
  document.querySelector('.mission-name').textContent = ''
  document.querySelector('.mission-location').textContent = ''
  document.querySelector('.mission-info').textContent = 'No description yet'
  document.querySelector('.mission-countdown').textContent = ''
}

const main = () => {
  goGetTheImage()
  goGetLaunchData()
  // firstUpcomingLaunch()
  // theFinalCountdown()
  // updateCountdownClock()
  // updateHTML()
}

document.addEventListener('DOMContentLoaded', main)
// document.addEventListener('DOMContentLoaded', theFinalCountdown)
document
  .querySelector('.left-arrow-button')
  .addEventListener('click', previousSpaceXMission)
document
  .querySelector('.right-arrow-button')
  .addEventListener('click', nextSpaceXMission)
