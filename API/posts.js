
// get api ra podcast
// getLayotBlog(getApi(url_podcast));
    // get api ra 
var url_blog = 'http://localhost:8000/post';
function start() {
  getApi(url_blog ,renderLayoutBlog);
  getApi(url_blog ,renderLayoutBlogList);
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
  console.log(responses);
  let userranker = sessionStorage.getItem('ranker');
console.log("rank user" + userranker);
  var htmls = responses.map(function (response) {
    return  `
    <div class="itemhome__post" id="post-item">
    <div class="item__img" onclick="blog_click(${response.id}, ${response.ranker}, ${userranker})">
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
      <h3 onclick="blog_click(${response.id}, ${response.ranker})">${response.title}</h3>
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

//click vào details
function blog_click(id, ranker, rankuser){
  if(rankuser >= ranker ){
    sessionStorage.setItem('id-blog', id);
    sessionStorage.setItem('rank-post', ranker);
    window.location.href = "blog_detail.html";
  }
  else{
    alert('bạn chưa đủ rank để xem')
  }
}

//Blog Details
let idblog = sessionStorage.getItem('id-blog');
console.log(idblog);
// get api ra podcast
var url_blog = 'http://localhost:8000/post';
fetch(url_blog + '/' + idblog)
  .then(response => response.json())
  .then(function (responses) {
    console.log(responses);
    var htmls = `
  
    <div class="blog__info">
        <div class="info">
          <div class="info__ava">
            <img src="../../IMG/logo_vn.png" alt="">
          </div>
          <div class="info__text">
            <h4>Dang Thu Huyen</h4>
            <p></p>
          </div>
          <div style="position: relative; top: -1px; left: 5px; font-size: 10px; cursor: pointer;">
            <i class="fas fa-crown" title="Quản trị viên"></i>
          </div>
          <span class="realtimedt">${responses.reg_date}</span>
        </div>
        <div class="dotsdt">
          <i class="fas fa-ellipsis-v dot"></i>
          <span class="sharedt" id="share">
            <i class="fas fa-share" style="margin-right: 10px;"></i>Chia sẻ bài đăng
          </span>
        </div>
      </div>

      <div class="blog__title">
        ${responses.title}
      </div>

      <div class="blog__img">
        <div class="img__block">
          <img src="${responses.image}" alt="" class="block">
        </div>
        <div class="img__none">
          <div class="flex">
            <img src="../../IMG/book_04.jpg" alt="">
            <img src="../../IMG/close.png" alt="" class="closeimg">
          </div>
        </div>
      </div>

      <!-- Blog description -->
      <div class="blog__des">
        <div class="text__des">
          <p>
            ${responses.content}
          </p>
        </div>
      </div>

      <!-- Share blog -->
      <div class="blog__share">
        <div class="icon__share">
          <ul>
            <li><a href="https://www.facebook.com/sharer/sharer.php?u=https://WebsitePodcast/SRC/HTML/blog_detail.html/"><i class="fab fa-facebook-f"></i></a></li>
            <li><a href="https://twitter.com/share?text=&url=https://WebsitePodcast/SRC/HTML/blog_detail.html/"><i class="fab fa-twitter"></i></a></li>
            <li><a href=""><i class="fab fa-instagram"></i></a></li>
            <li><a href=""><i class="fas fa-link"></i></a></li>
          </ul>
        </div>
        <div class="share__text">
          <a href="">Phát triển bản thân</a>
        </div>
      </div>

      <!-- View blog -->
      <div class="blog__view">
        <div class="view"> ${responses.numview}<span> lượt xem</span></div>
        <div class="like" style="display: flex;">
          <div style="margin-right: 10px; text-decoration: underline;"> ${responses.numcomment} bình luận</div>
          <span> ${responses.numlove}</span>&nbsp;<i class="far fa-heart"></i>
        </div>
      </div>
        
    `;
    document.getElementById('blog-item').innerHTML = htmls;
  })
  .catch((error) => {
    console.error('Error:', error);
  });


function renderLayoutBlogList(responses){
  let userranker = sessionStorage.getItem('ranker');
  var htmls = responses.map(function (response) {
    return  `
    <div class="item__post">
    <a class="item__img" onclick="blog_click(${response.id}, ${response.ranker})">
      <img
        src="${response.image}"
        alt="">
    </a>
    <div style="display: flex;">
      <div class="item__info">
        <div class="info__avablog">
          <img src="../../IMG/logo_vn.png" alt="">
        </div>
        <div class="info__text">
          <h5>${response.user}</h5>
          <p class="realtimebl">4 giờ trước</p>
        </div>
        <div style="position: relative; top: -6px; left: 5px; font-size: 10px; cursor: pointer;">
          <i class="fas fa-crown" title="Quản trị viên"></i>
        </div>
      </div>
      <div class="dots">
        <i class="fas fa-ellipsis-v"></i>
        <span class="share" id="share">
          <i class="fas fa-share"></i>
          Chia sẻ bài đăng
        </span>
      </div>
    </div>
    <div class="item__title">
      <a href="blog_detail.html" style="color: black; text-decoration: none;">
        <h3 onclick="blog_click(${response.id}, ${response.ranker})">${response.title}</h3>
        <p>
        ${response.content}
        </p>
      </a>
    </div>
    <div style="border-bottom: 1px solid#ccc; width: 250px; margin: auto;"></div>
    <div class="item__icon">
      <div>
        <i class="far fa-eye">${response.numview}</i>
        <i class="far fa-comment-alt" style="margin-left: 10px;"> 10</i>
      </div>
      <i class="far fa-heart"> ${response.numlove}</i>
    </div>
  </div>
    `;
});
var html = htmls.join('');
document.getElementById('blog-list-item').innerHTML = html;

}