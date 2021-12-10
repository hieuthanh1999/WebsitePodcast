// var getUrl = window.location;
// var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];

var url2= 'http://localhost:8000/users';

var url=  'http://localhost:8000/user';
// if(getData() == true){
//   setForm();
// }else{
//   console.log("failed");
// }
function setData(data) {
  
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Access-Control-Allow-Origin','*')
  myHeaders.append('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,PATCH,OPTIONS')
  myHeaders.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept')

  VALUE = JSON.stringify(data, null, 2);
    var options ={
      method: 'POST',
      headers: myHeaders,
      mode:"cors",
      cache: 'default',
      body: VALUE,
      Credential:false,
    }


    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
}

// function getData() {
//   let email = document.getElementById('email').value;
//     fetch(url2)
//       .then(response => response.json())
//       .then(data => {
//         data['user'].forEach(element => {
//             if(email == element.email){
//                 console.log("đã có email");
//                 return false;
//             }else{
//                 return true;
//             }
//         })
//         })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
// }
function setForm(){
    var btn_account = document.querySelector('#register_account');
    form.addEventListener('submit', function (e) {
      // e.preventDefault()
      // checkInputs()
      // alert("Dsadsa");
      let username = document.getElementById('username').value;
      let email = document.getElementById('email').value;
      let phoneNumber = document.getElementById('phone').value;
      let pass = document.getElementById('pass').value;
        var formData =
        {
            "name": username,
            "email": email,
            "password": pass,
            "phone": phoneNumber,
            "avatar": null,
            "type": null,
            "ranker": null
        }
        setData(formData);
        // window.location.href = "login.html"
         
    })
}

setForm();


// function submitInfor() {
//   var postApi = "http://localhost:8080/authenticate"
// let form = document.forms["myForm"];
// let fd = new FormData(form);
// let data = {};
// for (let [key, prop] of fd) {
//   data[key] = prop;
// }
// VALUE = JSON.stringify(data, null, 2);

// const myHeaders = new Headers();
// myHeaders.append('Content-Type', 'application/json');
// myHeaders.append('Access-Control-Allow-Origin','*')
// myHeaders.append('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,PATCH,OPTIONS')
// myHeaders.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept')


// fetch(postApi, {
//   method: 'POST',
//   headers: myHeaders,
//   mode:"cors",
//   cache: 'default',
//   body: VALUE,
//   Credential:false,
// })
//   .then(data => data.json())
//   .then(data => { console.log(data)
//     localStorage.setItem("token",data.jwtToken)
//     window.location.href = "WebsitePodcast/FE/SRC/HTML/homepage.html"
//    })
//   .catch((err) => {
//     console.error(err);
//   })
// }