const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,PATCH,OPTIONS');
myHeaders.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
myHeaders.append('Access-Control-Allow-Origin', 'http://localhost:8000');
myHeaders.append('Access-Control-Allow-Credentials', 'true');

//Xử lý session userƯ
let name = sessionStorage.getItem('useradmin');
let id = sessionStorage.getItem('idadmin');
let avatar = sessionStorage.getItem('avataradmin');
if(name != null){
  console.log(name);
  console.log(avatar);
  document.getElementById('username-admin').innerHTML = name;
  document.getElementById('image-admin').src = avatar; 
}
var logoutadmin =  document.getElementById('logoutadmin');
logoutadmin.onclick = function(){
  console.log(name);
  console.log(avatar);
  sessionStorage.removeItem('useradmin');
  sessionStorage.removeItem('idadmin');
  sessionStorage.removeItem('avataradmin');
  var getUrl = window.location;
  var baseUrl = getUrl .protocol + "//" + getUrl.host + "/" + getUrl.pathname.split('/')[1];
  window.location = baseUrl + "/SRC/HTML/login.html";
  // alert(window.location.url);
}
getListBlog
var url_user = 'http://localhost:8000/user';
var url_course = 'http://localhost:8000/course';
var url_category = 'http://localhost:8000/category';
var url_blog = 'http://localhost:8000/post';
var url_podcast = 'http://localhost:8000/podcast';
//ham main 
function start() {
  getApiAdmin(url_user ,getListUser);
  getApiAdmin(url_user ,getListAdmin);
  getApiAdmin(url_course ,getListCourse);
  getApiAdmin(url_category ,getListCategory);
  getApiAdmin(url_category ,getListCategoryPodCast);
  getApiAdmin(url_blog ,getListBlog);getListBlog
  getApiAdmin(url_podcast ,getListPodCast);getCoursePost
  getApiAdmin(url_category ,getCategoryPost);
  getApiAdmin(url_course ,getCoursePost);
}
start();

//Get API chung
function getApiAdmin(url,callback) {
  fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(callback)
  .catch((error) => {
      console.error('Error:', error);
  });
}
//GET USER
function getListUser(responses) {
var user = responses.filter(function (person) { return person.type == 'user';});
  if(user){
    var i =1;
    var html = user.map(function (response) {
          return  `
        <tr class="data-id-${response.id}">
          <td data-label="STT">${i++}</td>
          <td data-label="Hình ảnh" style="text-align: center;"><img
                  style="width: 50px;height: 50px; border-radius: 100%; object-fit: cover;"
                  src="${response.avatar}" alt=""></td>
          <td data-label="Tên">${response.name}</td>
          <td data-label="Email">${response.email}</td>
          <td data-label="Phone">${response.phone}</td>
          <td data-label="Xoá" class="right__iconTable"><a><img
                      src="assets/icon-trash-black.svg" onclick="deleteUser(${response.id})" alt=""></a></td>
      </tr>
        `;
  });
  var htmls = html.join('');
  document.getElementById('listuser').innerHTML = htmls;
  }
}
//GET List Admin
function getListAdmin(responses) {
  var userAdmin = responses.filter(function (person) { return person.type == 'admin';});
  if(userAdmin){
    var j =1
    var html = userAdmin.map(function (response) {
          return  `
          <tr>
            <td data-label="STT">${j++}</td>
            <td data-label="Tên">${response.name}</td>
            <td data-label="Hình ảnh" style="text-align: center;"><img
                    style="width: 50px;height: 50px; border-radius: 100%; object-fit: cover;"
                    src="${response.avatar}" alt=""></td>
            <td data-label="Email">${response.email}</td>
            <td data-label="Sửa" class="right__iconTable"><a ><img onclick="update_admin(${response.id})"
                        src="assets/icon-edit.svg" alt=""></a></td>
            <td data-label="Xoá" class="right__iconTable"><a  ><img onclick="delete_admin(${response.id})"
                        src="assets/icon-trash-black.svg" alt=""></a></td>
        </tr>
        `;
    });
  var htmls = html.join('');
  document.getElementById('listadmin').innerHTML = htmls;
  }
}
//GET List Course
function getListCourse(responses) {
    var j =1
    var html = responses.map(function (response) {
          return  `
          <tr>
          <td data-label="STT">${j++}</td>
          <td data-label="Tiêu đề">
              <img src="${response.image}" alt="">
          </td>
          <td data-label="Tên Khoa">${response.name}</td>
          <td data-label="Giá SP">${response.totalUser}</td>
          <td data-label="Mã giảm giá">
              <p id="limit">
              ${response.description}
              </p>
          </td>
          <td data-label="Sửa" class="right__iconTable"><a><img onclick="update_course(${response.id})"
                      src="assets/icon-edit.svg" alt=""></a></td>
          <td data-label="Xoá" class="right__iconTable"><a ><img  delete_course(${response.id})
                      src="assets/icon-trash-black.svg" alt=""></a></td>
      </tr>
        `;
    });
  var htmls = html.join('');
  document.getElementById('list-course').innerHTML = htmls;
  }
//GET List Course
function getListCategory(responses) {
  var blog = responses.filter(function (person) { return person.type_category == "0"});
  var j =1
  if(blog){
    var htmls = blog.map(function (response) {
      return  `
      <tr>
        <td data-label="STT">${j++}</td>
        <td data-label="Tiêu đề">${response.name}</td>
        <td data-label="Mô tả">${response.description}</td>
        <td data-label="Sửa" class="right__iconTable"><a
                ><img onclick="update_category(${response.id})" src="assets/icon-edit.svg"
                    alt=""></a></td>
        <td data-label="Xoá" class="right__iconTable"><a><img onclick="update_category(${response.id})"
                    src="assets/icon-trash-black.svg" alt=""></a></td>
      </tr>
        `;
      });
      var html = htmls.join('');
      document.getElementById('list-category').innerHTML = html;
  }
}
//GET List Course
function getListCategoryPodCast(responses) {
  var podcast = responses.filter(function (person) { return person.type_category == "1"});
  var j =1;
  if(podcast){
    var htmls = podcast.map(function (response) {
      return  `
      <tr>
      <td data-label="STT">${j++}</td>
      <td data-label="Tiêu đề">${response.name}</td>
      <td data-label="Mô tả">${response.description}</td>
      <td data-label="Sửa" class="right__iconTable"><a
              ><img onclick="update_category(${response.id})" src="assets/icon-edit.svg"
                  alt=""></a></td>
      <td data-label="Xoá" class="right__iconTable"><a><img onclick="update_category(${response.id})"
                  src="assets/icon-trash-black.svg" alt=""></a></td>
    </tr>
        `;
      });
      var html = htmls.join('');
      document.getElementById('list-category-podcast').innerHTML = html;
    }
}
function update_category(id){
  sessionStorage.setItem('id-category', id);
  window.location.href = "edit_category.html";
}
//GET List Blog
function getListBlog(responses) {
  var j =1;
  console.log(responses);
    var htmls = responses.map(function (response) {
      return  `
      <tr>
      <td data-label="STT">${j++}</td>
      <td data-label="Title">${response.title}</td>
      <td data-label="Image"><img src="${response.image}" alt=""></td>
      <td data-label="Category">${response.id_category}</td>
      <td data-label="Rank">${response.ranker}</td>
      <td data-label="Content" id="limit">
      ${response.content}
      </td>
      <td data-label="Sửa" class="right__iconTable"><a ><img onclick="update_blog(${response.id})"
                  src="assets/icon-edit.svg" alt=""></a></td>
      <td data-label="Xoá" class="right__iconTable"><a ><img onclick="delete_blog(${response.id})"
                  src="assets/icon-trash-black.svg" alt=""></a></td>
  </tr>
        `;
      });
      var html = htmls.join('');
      document.getElementById('list-blog').innerHTML = html;
}
function update_blog(id){
  sessionStorage.setItem('id-blog', id);
  window.location.href = "edit_post.html";
}
//GET List PodCast
function getListPodCast(responses) {
  var j =1;
  console.log(responses);
    var htmls = responses.map(function (response) {
      return  `
      <tr>
          <td data-label="STT">${j++}</td>
          <td data-label="Title">${response.title}</td>
          <td data-label="Image"><img src="${response.image}" alt=""></td>
          <td data-label="Audio">
          <audio controls>
            <source src="${response.audio}">
          </audio></td>
          <td data-label="Category">${response.id_category}</td>
          <td data-label="Course">${response.id_course}</td>
          <td data-label="Content" id="limit">
          ${response.content}
          </td>
          <td data-label="Sửa" class="right__iconTable"><a><img onclick="update_podcast(${response.id})"
                      src="assets/icon-edit.svg" alt=""></a></td>
          <td data-label="Xoá" class="right__iconTable"><a  ><img onclick="delete_podcast(${response.id})"
                      src="assets/icon-trash-black.svg" alt=""></a></td>
      </tr>
        `;
      });
      var html = htmls.join('');
      document.getElementById('list-pod-cast').innerHTML = html;
}

//GET List PodCast
function getCategoryPost(responses) {
    var htmls = responses.map(function (response) {
      return  `
          <option value="${response.id}">${response.name}</option>
        `;
      });
      var html = htmls.join('');
      document.getElementById('postcategory').innerHTML = html;
}
function getCoursePost(responses) {
  var htmls = responses.map(function (response) {
    return  `
        <option value="${response.id}">${response.name}</option>
      `;
    });
    var html = htmls.join('');
    document.getElementById('courses_name').innerHTML = html;
}
// function deleteUser(id){
//     var url_user = 'http://localhost:8000/user'  + '/' + id;
//     var options = {
//         method: 'DELETE',
//         mode: 'no-cors', // It can be no-cors, cors, same-origin
//         credentials: 'same-origin', // It can be include, same-origin, omit
//         headers: {"Access-Control-Allow-Origin": "*"}, // Allo
//         body: null
//     };
//     fetch(url_user, options)
//     .then(data => {
//         var dele = document.querySelector('.data-id-' + id);
//         if(dele){
//             dele.remove()
//         }
//     })
//     .catch((error) => {
//       console.error('Error:', error);
//     });
// }