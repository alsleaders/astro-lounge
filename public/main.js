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
  // .then(message.url => {
  //   console.log({ message.url })
  // })
}
const main = () => {
  goGetTheImage()
}
document.addEventListener('DOMContentLoaded', main)
