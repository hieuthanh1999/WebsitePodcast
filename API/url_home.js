var url_blog = 'http://localhost:8000/post';
var url_category = 'http://localhost:8000/category';
var url_podcast = 'http://localhost:8000/podcast';

//Xử lý session user
let name = sessionStorage.getItem('user');
let avatar = sessionStorage.getItem('avatar');
let ranker = sessionStorage.getItem('ranker');
let idusersetrank = sessionStorage.getItem('id-user');
//xử lý xem có tồn tại name user ko?
if(name){
  function course_click(id){
  sessionStorage.setItem('id-course', id);
  window.location.href = "course_detail.html";
}
}

async function getuser(url){
  let usercheck = await fetch(url);
  if(usercheck.status === 200){
    let apirank = await usercheck.json();
    return apirank.rank;
  }
}
//click vào trang profile
function clickprofile(){
  if(name){
    window.location.href = "profile.html";
  }
}
//xử lý xem có tồn tại name user ko? xử lý logout
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
//xử lý logout và hủy storage
var logout =  document.getElementById('logouthome');
logout.onclick = function(){
  console.log(name);
  console.log(avatar);
  sessionStorage.removeItem('user');
  sessionStorage.removeItem('avatar');
  sessionStorage.removeItem('ranker');
}

