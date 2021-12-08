var getUrl = window.location;
var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];

var url2= baseUrl + "/API/user/read";

var url=  baseUrl + "/API/user/create";
// if(getData() == true){
//   setForm();
// }else{
//   console.log("failed");
// }
function setData(data) {
    var options ={
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
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
        window.location.href = "login.html"
         
    })
}

setForm();