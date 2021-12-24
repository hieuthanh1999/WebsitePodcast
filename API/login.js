function submitInfor() {
    let pass = document.getElementById('password').value;
    let email = document.getElementById('email').value;
    var url = 'http://localhost:8000/user';
      fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        data.forEach(element => {
          if(email == element.email && pass == element.password){
            if(element.type == 'admin'){
              console.log('Success: admin');
              sessionStorage.setItem('useradmin',element.name);
              sessionStorage.setItem('idadmin',element.id);
              sessionStorage.setItem('avataradmin',element.avatar);
              window.location.href = "../../ADMIN/index.html";
            }else{
              console.log('Success: home');
              sessionStorage.setItem('user',element.name);
              sessionStorage.setItem('avatar',element.avatar);
              sessionStorage.setItem('ranker',element.ranker);
              sessionStorage.setItem('id-user',element.id);
              window.location.href = "homepage.html";
            }
            // console.log(element.name);
            // console.log(element.avatar);
        }
        })})
      .catch((error) => {
        console.error('Error:', error);
      });
}