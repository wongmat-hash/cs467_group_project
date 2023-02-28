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
  let experienceList = document.getElementById('experience-list')

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
