//const editTripForm = document.querySelector('#electric-cars')

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

/*editTripForm.addEventListener('submit', function () {
  let editedTripID = document.getElementById('editTripID')
  editedTripID = editedTripID.value
  let editedTripName = document.getElementById('edit-trip-name')
  editedTripName = editedTripName.value
  let data = {
    tripID: editedTripID,
    tripName: editedTripName,
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

const experienceList = document.getElementById('experience-list')

function loadExperiences(loadID) {
  let data = {
    tripID: loadID,
  }
  let xhttp = new XMLHttpRequest()
  xhttp.open('POST', '/TripExperiences', true)
  xhttp.setRequestHeader('Content-type', 'application/json')

  xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
      updateExperiences(xhttp.response)
    } else if (xhttp.readyState == 4 && xhttp.status != 200) {
      console.log('There was an error with the input.')
    }
  }
  xhttp.send(JSON.stringify(data))
}

function updateExperiences(experiences) {
  let parsedData = JSON.parse(experiences)

  for (experience in parsedData) {
    let expListItem = document.createElement('LI')
    let listItemDelete = document.createElement('BUTTON')
    expListItem.className = 'list-group-item'
    expListItem.innerText = parsedData[experience].experienceTitle
    listItemDelete.innerText = 'X'
    listItemDelete.className = 'btn btn-danger float-end'
    listItemDelete.onclick = function (event) {
      event.preventDefault()
      deleteTripExperience(parsedData[experience].experienceID)
    }
    expListItem.appendChild(listItemDelete)
    experienceList.appendChild(expListItem)
  }
}

function removeExperiences() {
  while (experienceList.firstChild) {
    experienceList.removeChild(experienceList.firstChild)
  }
}

function cleanExperiences() {
  $('#editTripModal').modal('hide')
  removeExperiences()
}

function addTripName(tripName) {
  var link = document.getElementById('edit-trip-button')

  window.open(link.href, '_blank')

  params.set('trip', tripName)
  window.location.search = params.toString()
}*/
