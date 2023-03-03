const editTripForm = document.getElementById('editTripForm')
// update trip name
editTripForm.addEventListener('submit', function () {
  let editedTripID = document.getElementById('editTripID')
  editedTripID = editedTripID.value
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

function addExperienceToTrip() {
  let addExpTripID = document.getElementById('addExpTripID')
  addExpTripID = addExpTripID.value

  let addExpTripName = document.getElementById('addExpTripName')
  addExpTripName = addExpTripName.value

  let addExpID = document.getElementById('addExpID')
  addExpID = addExpID.value

  let addExpName = document.getElementById('addExpName')
  addExpName = addExpName.value

  let data = {
    tripID: addExpTripID,
    tripName: addExpTripName,
    expID: addExpID,
    expName: addExpName
  }
  console.log(data)
  var xhttp = new XMLHttpRequest()
  xhttp.open('POST', `/Trips/${editedTripID}/edit/${editedTripName}`, true)
  xhttp.setRequestHeader('Content-type', 'application/json')

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      window.location = `/Trips/${editedTripID}/edit/${editedTripName}`
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log('There was an error with the input.')
    }
  }
  xhttp.send(JSON.stringify(data)

}
