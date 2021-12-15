var postApi = "http://localhost:8000/user";
form.addEventListener('submit', function (e) {
  let username = document.getElementById('username').value;
  let email = document.getElementById('email').value;
  let phoneNumber = document.getElementById('phone').value;
  let pass = document.getElementById('pass').value;
  var getUrl = window.location;
  var localhost = getUrl.protocol + "//" + getUrl.host + "/";
  var datas = {
    "name": username,
    "email": email,
    "password": pass,
    "phone": phoneNumber,
    "avatar": localhost+ "WebsitePodcast/IMG/user.jpg",
    "type": "user",
    "ranker": "đồng"
  }
  VALUE = JSON.stringify(datas);

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,PATCH,OPTIONS');
  myHeaders.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  myHeaders.append('Access-Control-Allow-Origin', '*');
  myHeaders.append('Access-Control-Allow-Credentials', 'true');

  fetch(postApi, {
    method: 'POST',
    headers: myHeaders,
    mode: 'no-cors',
    body: VALUE
  })
    .then(data => {
      console.log(data);
      window.location.href = "login.html"
    })
    .catch((err) => {
      console.error(err);
    });
});
