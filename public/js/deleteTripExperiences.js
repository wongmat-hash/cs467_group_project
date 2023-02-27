function deleteTripExperience(deleteID) {
  event
  let data = {
    experienceID: deleteID,
  }
  let xhttp = new XMLHttpRequest()
  xhttp.open('DELETE', '/TripExperiences', true)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {
      window.location = '/Trips'
    } else if (xhttp.readyState == 4 && xhttp.status != 204) {
      console.log('There was an error with the input.')
    }
  }
  xhttp.send(JSON.stringify(data))
}
