const editTripForm = document.getElementById('editTripForm')
const tripID = document.getElementById('expTripID').value
const tripName = document.getElementById('expTripName').value


// update trip name
editTripForm.addEventListener('submit', function () {
  let editedTripID = tripID
  let editedTripName = document.getElementById('editTripName')
  editedTripName = editedTripName.value
  let data = {
    tripID: editedTripID,
    tripName: editedTripName,
  }

  var xhttp = new XMLHttpRequest()
  xhttp.open('PUT', `/Trips/${editedTripID}/edit/${editedTripName}`, true)
  xhttp.setRequestHeader('Content-type', 'application/json')

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      window.location = `/Trips/${editedTripID}/edit/${editedTripName}`
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log('There was an error with the input.')
    }
  }
  xhttp.send(JSON.stringify(data))
})

// add experience to trip
function addExperienceToTrip(expID, expName) {
  let addExpTripID = tripID
  let addExpTripName = tripName

  let addExpID = expID
  let addExpName = expName

  let data = {
    tripID: addExpTripID,
    tripName: addExpTripName,
    expID: addExpID,
    expName: addExpName,
  }

  console.log(data)

  var xhttp = new XMLHttpRequest()
  xhttp.open('POST', `/Trips/${addExpTripID}/edit/${addExpTripName}`, true)
  xhttp.setRequestHeader('Content-type', 'application/json')

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      window.location = `/Trips/${addExpTripID}/edit/${addExpTripName}`
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log('There was an error with the input.')
    }
  }
  xhttp.send(JSON.stringify(data))
}


// delete trip experience
function deleteTripExperience(deleteExpID) {
  console.log(tripID, tripName)
  let delExpTripID = tripID
  let delExpTripName = tripName
  let data = {
    tripID: delExpTripID,
    expID: deleteExpID,
  }
  console.log(data)
  let xhttp = new XMLHttpRequest()
  xhttp.open('DELETE',`/Trips/${delExpTripID}/edit/${delExpTripName}`, true)
  xhttp.setRequestHeader('Content-type', 'application/json')
  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 204) {
      window.location = `/Trips/${delExpTripID}/edit/${delExpTripName}`
    } else if (xhttp.readyState == 4 && xhttp.status != 204) {
      console.log('There was an error with the input.')
    }
  }
  xhttp.send(JSON.stringify(data))
}
