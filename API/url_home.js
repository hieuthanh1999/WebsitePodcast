var url_blog = 'http://localhost:8000/post';
var url_category_pod = 'http://localhost:8000/category';
var url_podcast = 'http://localhost:8000/podcast';

//Xử lý session user
let name = sessionStorage.getItem('user');
let avatar = sessionStorage.getItem('avatar');
let ranker = sessionStorage.getItem('ranker');
let idusersetrank = sessionStorage.getItem('id-user');
if(name){
  function course_click(id){
  sessionStorage.setItem('id-course', id);
  window.location.href = "course_detail.html";
}
checkrankusser();
}
async function checkrankusser(){
  let datarankuser = await fetch('http://localhost:8000/updaterank');
  let usercheck = await fetch('http://localhost:8000/user' + "/" + idusersetrank);
    if(datarankuser.status === 200){
      let apirank = await datarankuser.json();
      let apirankuser = await usercheck.json();
      var checkrank = apirank.filter(function(user) {
        return user.id_user == idusersetrank;
      });
      var datas={};
      switch (checkrank.length)
      {
          case 5 : {
              var datas =  {
                "name": apirankuser.name,
                "email": apirankuser.email,
                "password": apirankuser.password,
                "phone":apirankuser.phone,
                "avatar": apirankuser.avatar,
                "type": apirankuser.type,
                "ranker": "2"
            }
            let rankcheck = "2"
            updateuser(datas,idusersetrank, rankcheck );
              break;
          }
          case 10 : {
            var datas =  {
              "name": apirankuser.name,
              "email": apirankuser.email,
              "password": apirankuser.password,
              "phone":apirankuser.phone,
              "avatar": apirankuser.avatar,
              "type": apirankuser.type,
              "ranker": "3"
          }
          let rankcheck = "3"
          updateuser(datas,idusersetrank, rankcheck );
              break;
          }
          default : {
             
          }
      }

    }
}
async function updateuser(datas, iduser, ranker){
  VALUE = JSON.stringify(datas);

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,PATCH,OPTIONS');
  myHeaders.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  myHeaders.append('Access-Control-Allow-Origin', '*');
  myHeaders.append('Access-Control-Allow-Credentials', 'true');

  fetch('http://localhost:8000/user' + '/' + iduser, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json', 
    },
    body: VALUE
  })
  .then(function (responses) {
    alert("chúc mừng bạn  đã lên level!");
    sessionStorage.setItem('ranker',ranker);
  })
  .catch((err) => {
    console.error(err);
  });

}
async function getuser(url){
  let usercheck = await fetch(url);
  if(usercheck.status === 200){
    let apirank = await usercheck.json();
    return apirank.rank;
  }
}
function clickprofile(){
  if(name){
    window.location.href = "profile.html";
  }
}
if(name != null){
  console.log(name);
  console.log(avatar);
  document.getElementById('nonelogin').style.display = 'none';
   document.getElementById('logout').style.display = 'block';
  document.getElementById('name-profile').innerHTML = 'Hi: '  + name;
  document.getElementById('name-profile').style.color = 'white';
  
  document.getElementById('profile').src = avatar;
  document.getElementById('profile').style.display = 'block';
  
}
else{
  console.log(name);
  console.log(avatar);
  document.getElementById('logout').style.display = 'none';
  document.getElementById('nonelogin').style.display = 'flex';
  document.getElementById('name-profile');
}
var logout =  document.getElementById('logouthome');
logout.onclick = function(){
  console.log(name);
  console.log(avatar);
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('avatar');
  sessionStorage.removeItem('ranker');
}

