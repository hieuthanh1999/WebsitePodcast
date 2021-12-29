let idcourse = sessionStorage.getItem('id-course');
// get api ra podcast
var urlpodcast = 'http://localhost:8000/podcast';
fetch(urlpodcast)
  .then(response => response.json())
  .then(function (responses) {
    let i=1;
    var podcast = responses.filter(function (person) { return person.id_course == idcourse});
    var htmls = podcast.map(function (response) {
        return `
          <a id="id-${i++}" onclick="clickpodcast(${response.id})" class="left__list" style="display: inline">
            <div class="left__itemTitleCourse">
              <img src="${response.image}" alt="">
              <span>${response.title}</span>
            </div>
          </a> `;
    })
    var html = htmls.join('');
    document.getElementById('listpodcastcourse').innerHTML = html;
  })
  .catch((error) => {
    console.error('Error:', error);
  });

  window.onload=function(){
    document.getElementById("id-1").click();
  };

  // get details course
  var urlcoursedetails = 'http://localhost:8000/course';
  fetch(urlcoursedetails + '/' + idcourse)
    .then(response => response.json())
    .then(function (responses) {
      document.getElementById('imagecourse').setAttribute('src',responses.image);
      document.getElementById('titlecourse').innerHTML = responses.name ;
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  
var urlcoursedetails = 'http://localhost:8000/course';
  fetch(urlcoursedetails + '/' + idcourse)
    .then(response => response.json())
    .then(function (responses) {
      document.getElementById('imagecourse').setAttribute('src',responses.image);
      document.getElementById('titlecourse').innerHTML = responses.name ;
    })
    .catch((error) => {
      console.error('Error:', error);
    });

function clickpodcast(id){
fetch(urlpodcast + '/' + id)
  .then(response => response.json())
  .then(function (responses) {
    console.log(responses);
    var htmls = `
      <div>
        <div class="right__member">
            <p>233</p><span>&nbsp;Người tham dự&nbsp;</span>
        </div>
        <div class="right__bannerimg">
            <img src="../..//IMG/course.png" alt="">
        </div>
        <div class="right__maincontent">
            <div class="bannercourse">
              <div class="course_img">
                <img src="${responses.image}" alt="">
              </div>
              <div class="course_info">
                <p>Đặng Thu Huyền's Podcast</p>
                <span>${responses.title}</span>
                <div class="iconSpotify">
                  <i class="fab fa-spotify" title="Spotify"></i>
                </div>
              </div>
            </div>

            <!-- Phần hiển thị xử lý audio  -->
            <div class="course_audio">
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
            <div class="pod-dt" id="podContent">
              <div class="pod_curentime">
                <span>Đặng Thu Huyền</span>&nbsp; | &nbsp;<span class="realdate">6/10/2021</span>
              </div>
              <div class="pod_des">
                <p>
                  ${responses.content}
                </p>
              </div>
            </div>
        </div>
        </div> `;
    document.getElementById('course-details').innerHTML = htmls;
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
 // get api ra podcast
 var url_course = 'http://localhost:8000/course';
 fetch(url_course)
     .then(response => response.json())
     .then(function (responses) {
        console.log(responses);
        var htmls = responses.map(function (response) {
             return  `
             <div class="item__course">
           <a class="course__img" href="" onclick="course_click( ${response.id})">
             <img src="${response.image}" alt="">
           </a>
           <div>
             <div class="course__title">
               <a href="" onclick="course_click( ${response.id})">
                 <h3>${response.name}</h3>
                 <p>
                   ${response.totalUser} Người tham dự
                 </p>
               </a>
             </div>
             <div class="line"></div>
             <div class="course_member">
               course Member
             </div>
             <div class="course__btn">
               <button onclick="course_click( ${response.id})">Tham gia</button>
             </div>
           </div>
         </div>
             `;
        });
        var html = htmls.join('');
        document.getElementById('list-course').innerHTML = html;
     })
     .catch((error) => {
         console.error('Error:', error);
     });
 
     
 

