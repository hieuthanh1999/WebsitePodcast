// get api ra blog
var url_blog = 'http://localhost:8000/post';
fetch(url_blog)
    .then(response => response.json())
    .then(function (responses) {
       console.log(responses);
       var htmls = responses.map(function (response) {
            return  `
            <div class="item__post">
            <a class="item__img" href="blog_detail.html">
              <img
                src=${response.image}"
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
                <h3>${response.title}</h3>
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
    //    var html = htmls.join('');
    //    document.getElementById('blog').innerHTML = html;
    })
    .catch((error) => {
        console.error('Error:', error);
    });

