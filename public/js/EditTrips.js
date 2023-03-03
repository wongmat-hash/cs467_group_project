// delete trip from Trips page
function deleteTrip(deleteID) {
  let data = {
    tripID: deleteID,
  }
  let xhttp = new XMLHttpRequest()
  xhttp.open('DELETE', '/Trips', true)
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
