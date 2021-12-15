// get api ra podcast
// getLayotBlog(getApi(url_podcast));

function start() {
  getApi(url_blog ,renderLayoutBlog);
  getApi(url_category_pod, getCategory);
  getApi(url_podcast,renderLayoutPodCast);
}
start();

//Get API chung
function getApi(url,callback) {
  fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(callback)
  .catch((error) => {
      console.error('Error:', error);
  });
}

//Get Blog in home page
function renderLayoutBlog(responses){
  var htmls = responses.map(function (response) {
    return  `
    <div class="itemhome__post">
    <div class="item__img" onclick="blog_click(${response.id})">
      <img src="${response.image}" alt="">
    </div>
    <div class="item__info">
      <div class="info__ava">
        <img src="../../IMG/logo_vn.png" alt="">
      </div>
      <div class="info__text">
        <h5>${response.user}</h5>
        <p class="realtime">4 giờ trước</p>
      </div>
      <div style="position: relative; top: -6px; left: 5px; font-size: 10px; cursor: pointer;">
        <i class="fas fa-crown" title="Quản trị viên"></i>
      </div>
    </div>
    <div class="item__title" >
      <h3 onclick="blog_click(${response.id})">${response.title}</h3>
    </div>
    <div style="border-bottom: 1px solid#ccc; width: 250px; margin: auto;"></div>
    <div class="item__icon">
      <i class="far fa-eye">${response.numview}</i>
      <i class="far fa-heart">${response.numlove}</i>
    </div>
  </div>
    `;
});
  var html = htmls.join('');
  document.getElementById('postItem').innerHTML = html;
}
function blog_click(id){
  sessionStorage.setItem('id-blog', id);
  window.location.href = "blog_detail.html";
}


//Get Blog in home page
function renderLayoutPodCast(responses){
  console.log(responses);
  var htmls = responses.map(function (response) {
    return  `
    <div class="pod" style="display: block" >
    <a class="podcast_item" onclick="podcast_click(${response.id})" style="cursor:pointer">
      <div class="item_ava">
        <img src="${response.image}" alt="">
      </div>
      <i class="fas fa-play-circle"></i>
      <div class="item_pod">
        <div class="pod_title">
        ${response.title}
        </div>
        <div class="date_realtime">
          <span>${response.reg_date}</span>
        </div>
        <div class="podcast_des">
        ${response.content}
        </div>
      </div>
    </a>
    <div style="width: 100%; height: 1px; background-color: rgba(255, 255, 255, 0.2); margin: 25px 0;"></div>
  </div>
    `;
});
  var html = htmls.join('');
  document.getElementById('list-podcast').innerHTML = html;
}
function podcast_click(id){
  sessionStorage.setItem('id-podcast', id);
  window.location.href = "podcast_detail.html";
}

//Get Category Blog And Podcast
function getCategory(responses){
  var blog = responses.filter(function (person) { return person.type_category == "0"});
  var podcast = responses.filter(function (person) { return person.type_category == "1"});
  if(blog){
    var htmls = blog.map(function (response) {
      return  `
        <li><a href="${response.url}">${response.name}</a></li>
        `;
      });
      var html = htmls.join('');
      document.getElementById('category-post').innerHTML = html;
  }
  if(podcast){
    var htmls = podcast.map(function (response) {
      return  `
        <li><a href="${response.url}">${response.name}</a></li>
        `;
      });
      var html = htmls.join('');
      document.getElementById('category-podcast').innerHTML = html;
    }
}
