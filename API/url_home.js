var url_podcast = 'http://localhost:8000/post';
var url_category_pod = 'http://localhost:8000/category';

//Xử lý session user
let name = sessionStorage.getItem('user');
if(name != null){
  console.log(name);
  document.getElementById('nonelogin').style.display = 'none';
   document.getElementById('logout').style.display = 'block';
  document.getElementById('name-profile').innerHTML = 'Hi: '  + name;
  document.getElementById('name-profile').style.color = 'white';
  document.getElementById('profile').style.display = 'block';
  
}
else{
  console.log(name);
  document.getElementById('logout').style.display = 'none';
  document.getElementById('nonelogin').style.display = 'flex';
  document.getElementById('name-profile');
}
var logout =  document.getElementById('logouthome');
logout.onclick = function(){
  console.log(name);
  sessionStorage.removeItem('user');
}