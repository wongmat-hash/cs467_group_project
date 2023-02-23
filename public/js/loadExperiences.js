function loadExperiences(loadID) {
    console.log(loadID)
    let data = {
      tripID: loadID,
    }
    console.log(data)
    let xhttp = new XMLHttpRequest()
    xhttp.open('POST', '/TripExperiences', true)
    xhttp.setRequestHeader('Content-type', 'application/json')
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 204) {
        window.location = '/TripExperiences'
      } else if (xhttp.readyState == 4 && xhttp.status != 204) {
        console.log('There was an error with the input.')
      }
    }
    xhttp.send(JSON.stringify(data))
  }