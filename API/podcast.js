let idpostcast = sessionStorage.getItem('id-podcast');

//Get list Podcast
getApi(url_podcast);
 function getApi(url) {
    fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function(responses) {
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
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  }
  //điều hướng đến podcast details
  function podcast_click(id){
    sessionStorage.setItem('id-podcast', id);
    window.location.href = "podcast_detail.html";
  }
//lấy ra dữ liệu của 1 bản podcast
fetch(url_podcast + '/' + idpostcast)
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