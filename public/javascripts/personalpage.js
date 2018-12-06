const userId = window.location.pathname.split("/")[2];

function addFollow() {
  axios.post(`http://localhost:3000/users/${userId}/follow`)
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

function deleteFollow() {
  axios.delete(`http://localhost:3000/users/${userId}/follow`)
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

// addFollow();
