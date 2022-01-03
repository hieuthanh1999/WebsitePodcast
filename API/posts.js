
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
  let idusersave = sessionStorage.getItem('id-user');
console.log("rank user" + userranker);
  var htmls = responses.map(function (response) {
    return  `
    <div class="itemhome__post" id="post-item">
    <div class="item__img" onclick="blog_click(${response.id}, ${response.ranker}, ${userranker}, ${idusersave})">
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
      <h3 onclick="blog_click(${response.id}, ${response.ranker}, ${userranker}, ${idusersave})">${response.title}</h3>
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
function blog_click(id, ranker, rankuser, iduser){
  if(rankuser >= ranker ){
    
    sessionStorage.setItem('id-blog', id);
    sessionStorage.setItem('rank-post', ranker);
    updaterank(id, iduser);
    setTimeout(() => {
      window.location.href = "blog_detail.html";
    }, 300);
    
  }
  else{
    alert('bạn chưa đủ rank để xem');
    window.location.href = "homepage.html";
  }
}

async function updaterank(idblog, iduser){ 
    var datas = {
      "id_blog": idblog,
      "id_user": iduser
    }
    VALUE = JSON.stringify(datas);

  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,PATCH,OPTIONS');
  myHeaders.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
  myHeaders.append('Access-Control-Allow-Origin', '*');
  myHeaders.append('Access-Control-Allow-Credentials', 'true');

  fetch('http://localhost:8000/updaterank', {
    method: 'POST',
    headers: myHeaders,
    mode: 'no-cors',
    body: VALUE
  })
  .then(data => {
    console.log(data);
  })
  .catch((err) => {
    console.error(err);
  });
}

//Blog Details
let idblog = sessionStorage.getItem('id-blog');
var iduserlike = sessionStorage.getItem('id-user');
console.log(idblog);
// get api ra podcast
var url_blog = 'http://localhost:8000/post';
var url_userlove = 'http://localhost:8000/userlove';
var url_usercomment = 'http://localhost:8000/comment';
var url_userrank = 'http://localhost:8000/updaterank';
fetchText();
async function fetchText() {
  document.getElementById("comment-input").value = '';
    let response = await fetch(url_blog + '/' + idblog);
    let response2 = await fetch(url_userlove);
    let response3 = await fetch(url_usercomment);
    let datarank = await fetch(url_userrank);

    // console.log(response.status); // 200
    // console.log(response.statusText); // OK
    if(datarank.status === 200){
      let apirank = await datarank.json();
      var usersranktest = apirank.includes(function(user) {
        return user.id_user == iduserlike;
      });
      console.log("usersranktest");
      console.log(usersranktest);
    }
    if (response.status === 200) {
        let apiblog = await response.json();
        let apiuserlove = await response2.json();
        let apiusercmt = await response3.json();
        var userslove = apiuserlove.filter(function(user) {
          return user.id_blog == idblog;
        });
        var result = [];
        userslove.forEach(element => {
          result.push(element);
        });


        var userscmt = apiusercmt.filter(function(user) {
          return user.id_blog == idblog;
        });
        var result2 = [];
        userscmt.forEach(element => {
          result2.push(element);
        });
      

    function getBlog(){
        return new Promise(resolve => {
            setTimeout(function(){
                resolve(apiblog)
            }, 500);
        })
    }
    getBlog().then(function(apiblog){
          return apiblog;
  }).then(function(responses){
    var idusers = sessionStorage.getItem('id-user');
    var usersloglove = apiuserlove.filter(function(user) {
      return user.id_user == idusers;
    });

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
        <div style="margin-right: 10px; text-decoration: underline;">${result2.length} bình luận</div>
          <span> ${result.length}</span>&nbsp;<i onclick="cliclike(${responses.id}, ${iduserlike})" id="hearthihi" class="far fa-heart"></i>
          <input type="hidden" name="id" id="checkid" value=""/>
        </div>
      </div>
        
    `;

    document.getElementById('blog-item').innerHTML = htmls;
    // if(usersloglove[0].status == 1 ){
    //   document.getElementById('hearthihi').style.color = 'red';
    // }
        })
    }
}

function cliclike(idblog, iduser){
  var idusers = sessionStorage.getItem('id-user');
  
  let check  = 1;
  if(typeof(Storage) !== "undefined") {
    if (localStorage.clickcount) {
      localStorage.clickcount = Number(localStorage.clickcount)+1;
    } else {
      localStorage.clickcount = 1;
    }
    if(localStorage.clickcount == 1) {
      if((idusers == iduser)){
        document.getElementById('hearthihi').style.color = 'red';
        var datas = {
          "id_user": iduser,
          "id_blog": idblog,
          "status" : check
        }
        VALUE = JSON.stringify(datas);
      
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,PATCH,OPTIONS');
        myHeaders.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('Access-Control-Allow-Credentials', 'true');
      
        fetch('http://localhost:8000/userlove', {
          method: 'POST',
          headers: myHeaders,
          mode: 'no-cors',
          body: VALUE
        })
          .then(data => {
            location.reload();
            // console.log(data);
            //   document.getElementById('checkid').value = data.id;
          })
          .catch((err) => {
            console.error(err);
          });
      }
    }
    if(localStorage.clickcount % 2 == 0) {
      document.getElementById('hearthihi').style.color = 'black';
    }else{
      document.getElementById('hearthihi').style.color = 'red';
    }
  }
 
}

function renderLayoutBlogList(responses){
  let userranker = sessionStorage.getItem('ranker');
  var htmls = responses.map(function (response) {
    return  `
    <div class="item__post">
    <a class="item__img" onclick="blog_click(${response.id}, ${response.ranker}, ${userranker}, ${idusersave})">
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
      <a style="color: black; text-decoration: none;">
        <h3 onclick="blog_click(${response.id}, ${response.ranker}, ${userranker}, ${idusersave})">${response.title}</h3>
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
// //click vào details
// function blog_click2(id, ranker, rankuser){
//   if(rankuser >= ranker ){
//     sessionStorage.setItem('id-blog', id);
//     sessionStorage.setItem('rank-post', ranker);
//     window.location.href = "blog_detail.html";
//   }
//   else{
//     alert('bạn chưa đủ rank để xem');
//     window.location.href = "blog.html";
//   }
// }