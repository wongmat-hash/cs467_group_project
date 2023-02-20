const editTripForm = document.getElementById('edit-trip-form')

editTripForm.addEventListener('submit', function () {
    let editedTripID = document.getElementById('editTripID')
    editedTripID = editedTripID.value
    let editedTripName = document.getElementById('edit-trip-name')
    editedTripName = editedTripName.value
    let data = {
        tripID: editedTripID,
        tripName: editedTripName
    }
    var xhttp = new XMLHttpRequest()
    xhttp.open('PUT', '/Trips', true)
    xhttp.setRequestHeader('Content-type', 'application/json')
  
    xhttp.onreadystatechange = () => {
      if (xhttp.readyState == 4 && xhttp.status == 200) {
        window.location = '/Trips'
      } else if (xhttp.readyState == 4 && xhttp.status != 200) {
        console.log('There was an error with the input.')
      }
    }
    xhttp.send(JSON.stringify(data))
})