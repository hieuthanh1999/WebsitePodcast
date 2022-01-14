function start() {
    getApi(url_podcast,renderLayoutPodCast);
  }
  start();
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
//Get POdcast in home page

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

//Details 
let idpostcast = sessionStorage.getItem('id-podcast');
console.log(idpostcast);
// get api ra podcast
var url_blog = 'http://localhost:8000/podcast';
fetch(url_blog + '/' + idpostcast)
  .then(response => response.json())
  .then(function (responses) {
    console.log(responses);
    var htmls = `
    <!-- Banner -->
    <div class="bannerpcdt">
      <div class="banner__podcast">
        <div class="podcast_img">
          <img src="${responses.image}" alt=""">
        </div>
        <div class="podcast_info">
          <p>Đặng Thu Huyền's Podcast</p>
          <span>${responses.title}</span>
          <div class="iconSpotify">
            <i class="fab fa-spotify" title="Spotify"></i>
          </div>
        </div>
      </div>
    </div>

    <!-- Phần hiển thị xử lý audio  -->
    <div class="podcast_audio">
      <div class="player">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <div class="left">0.00</div>
          <input id="progresspcdt" class="progresspcdt" type="range" value="0" step="1" min="0" max="100">
          <div class="right">0.00</div>
        </div>
        <div class="control">
          <div class="btn btn-repeat">
            <i class="las la-sync-alt" title="Repeat"></i>
          </div>
          <div class="btn btn-prev">
            <i class="las la-undo-alt" title="Prev 10s"></i>
            <span>10</span>
          </div>
          <div class="btn btn-toggle-play">
              <i id="pau" onclick="pau()"  class="fas fa-pause icon-pause"></i>
              <i id="pay" onclick="pla()"   class="fas fa-play icon-play"></i>
           </div>
          <div class="btn btn-next">
            <i class="las la-redo-alt" title="Skip 10s"></i>
            <span>10</span>
          </div>
          <div class="btn btn-download">
            <i class="las la-download"></i>
          </div>
        </div>
        <audio id="myAudio">
        <source src="${responses.audio}" type="audio/ogg">
      </audio>
      </div>
    </div>

    <!-- Nội dung mô tả podcast -->
    <div class="pod_content" id="podContent">
      <div class="pod_curentime">
        <span>Đặng Thu Huyền</span>&nbsp; | &nbsp;<span class="realdate">${responses.reg_date}</span>
      </div>
      <div class="pod_des">
        <p>
          ${responses.content}
        </p>
      </div>
    </div>

    `;
    document.getElementById('podcast-details').innerHTML = htmls;
  })
  .catch((error) => {
    console.error('Error:', error);
  });


//     // get api ra 
// var url_blog = 'http://localhost:8000/post';
// fetch(url_blog)
//     .then(response => response.json())
//     .then(function (responses) {
//        console.log(responses);
//        var htmls = responses.map(function (response) {
//             return  `
//             <div class="item__post">
//             <a class="item__img" onclick="course_click(${response.id})">
//               <img
//                 src="${response.image}"
//                 alt="">
//             </a>
//             <div style="display: flex;">
//               <div class="item__info">
//                 <div class="info__avablog">
//                   <img src="../../IMG/logo_vn.png" alt="">
//                 </div>
//                 <div class="info__text">
//                   <h5>${response.user}</h5>
//                   <p class="realtimebl">4 giờ trước</p>
//                 </div>
//                 <div style="position: relative; top: -6px; left: 5px; font-size: 10px; cursor: pointer;">
//                   <i class="fas fa-crown" title="Quản trị viên"></i>
//                 </div>
//               </div>
//               <div class="dots">
//                 <i class="fas fa-ellipsis-v"></i>
//                 <span class="share" id="share">
//                   <i class="fas fa-share"></i>
//                   Chia sẻ bài đăng
//                 </span>
//               </div>
//             </div>
//             <div class="item__title">
//               <a href="blog_detail.html" style="color: black; text-decoration: none;">
//                 <h3 onclick="course_click(${response.id})">${response.title}</h3>
//                 <p>
//                 ${response.content}
//                 </p>
//               </a>
//             </div>
//             <div style="border-bottom: 1px solid#ccc; width: 250px; margin: auto;"></div>
//             <div class="item__icon">
//               <div>
//                 <i class="far fa-eye">${response.numview}</i>
//                 <i class="far fa-comment-alt" style="margin-left: 10px;"> 10</i>
//               </div>
//               <i class="far fa-heart"> ${response.numlove}</i>
//             </div>
//           </div>
//             `;
//        });
//        var html = htmls.join('');
//        document.getElementById('blog').innerHTML = html;

//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });

//     function course_click(id){
//       sessionStorage.setItem('id-blog', id);
//       window.location.href = "blog_detail.html";
//     }