let url_comment = 'http://localhost:8000/comment';
let url_user = 'http://localhost:8000/user';
let idcmtblog = sessionStorage.getItem('id-blog');

// getApi(url_comment);
fetchText();
async function fetchText() {
  document.getElementById("comment-input").value = '';
    let response = await fetch(url_comment);
    let response2 = await fetch(url_user);

    // console.log(response.status); // 200
    // console.log(response.statusText); // OK

    if (response.status === 200) {
        let commentsx = await response.json();
        let apiuser = await response2.json();
        var users = apiuser.filter(function(user) {
            return user.type == "user";
        });
        var comments = commentsx.filter(function(comment) {
          return comment.id_blog == idcmtblog;
      });
      console.log(comments);
    function getComment(){
        return new Promise(resolve => {
            setTimeout(function(){
                resolve(comments)
            }, 500);
        })
    }
    function getUsersByIds(userId){
        return new Promise(resolve => {
             var results = users.filter(function (user) {
               return userId.includes(user.id);
             });
             setTimeout(function(){
                 resolve(results);
             });     
        });
     }
     getComment().then(function(comments){
            var userId = comments.map(function (comment) {
                return comment.id_user;
            });
            return getUsersByIds(userId).then(function (users){
                return {
                    user : users,
                    comments : comments,
                };
            });
        }).then(function(data){
           var list = document.getElementById('commentblog');
           var html = '';
           console.log(data);
            data.comments.map(function (comment){
                var user = data.user.find(function (user){
                    return user.id === comment.id_user;
                });
                html += `
                <!-- Comment 1 -->
                <div class="data-id-${comment.id}">
                 <div class="count__comment">
                   <div class="info_cm"
                     style="margin-top: 20px; display: flex; justify-content: space-between; align-items: center;">
                     <div>
                       <div class="info__ava">
                         <img src="../../IMG/logo_vn.png" alt="">
                       </div>
                       <div class="info__text">
                         <h4>${user.name}</h4>
                         <p class="realtimedt_cm">${comment.reg_date}</p>
                       </div>
                       <div style="position: relative; top: 6px; left: 9px; font-size: 7px; cursor: pointer;">
                         <i class="fas fa-crown" title="Quản trị viên"></i> Render
                       </div>
                     </div>
                     <div class="dotdel" id="deletecmt">
                       <span onclick="deletecomment(${comment.id}, ${user.id})">xóa</span>
                     </div>
                   </div>
                   <div class="delcomment">
                     <span class="del">
                      Xóa
                     </span>
                   </div>
                   <div class="content_cm">
                     <p>${comment.comment}</p>
                   </div>
                   <div class="view_like">
                     <div class="like_rep">
                       <div>
                         <i class="far fa-heart" id="heart"></i>
                         <span>Thích</span>
                       </div>
                       <div>
                         <i class="far fa-comment-alt"></i>
                         <span class="rep">Phản hồi</span>
                       </div>
                     </div>

                   </div>
                    <!-- Viết phản hồi đầu tiên cho bình luận -->
                    <div class="feedback_cm">
                     <div class="info_cm">
                       <div class="info__ava" style="margin: 5px 5px 0 10px;">
                         <img src="../../IMG/logo_vn.png" alt="" style="width: 25px; height: 25px;">
                       </div>
                     </div>
                     <form class="feedback__text">
                       <div class="feedback_btn">
                         <div class="input_feedback">
                           <textarea type="text" placeholder="Viết phản hồi..." class="feedbackText"></textarea>
                         </div>
                       </div>
                       <div class="feedback_event">
                         <div class="event">
                           <div class="btn_camera">
                             <input type="file" id="camera">
                           </div>
                           <div class="btn_gif">
                             <input type="file" id="gif">
                           </div>
                           <div class="btn_emoji">
                             <input type="file" id="gif">
                           </div>
                         </div>
                         <div class="btn_cm">
                           <button class="close_feedback" type="button">Hủy</button>
                           <button class="post_feedback" type="submit">Đăng</button>
                         </div>
                       </div>
                     </form>
                   </div>
                   
                   <!-- Các phản hồi sẽ được add thêm ở đây -->
               
                   <!-- ---------------------------------- -->
                 </div>
               </div>
                `;
                list.innerHTML = html;
            })
        })
    }
}
var idblogcmt  = sessionStorage.getItem('id-blog');
var idusercmt = sessionStorage.getItem('id-user');
var url_comment2 = 'http://localhost:8000/comment';
function clickcomment(){
  
  var content = document.getElementById("comment-input").value;
  var datas = {
  "id_user": idusercmt,
  "comment": content,
  "id_blog": idblogcmt,
}
VALUE = JSON.stringify(datas);

const myHeaders = new Headers();
myHeaders.append('Content-Type', 'application/json');
myHeaders.append('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,PATCH,OPTIONS');
myHeaders.append('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept');
myHeaders.append('Access-Control-Allow-Origin', '*');
myHeaders.append('Access-Control-Allow-Credentials', 'true');

fetch(url_comment2, {
  method: 'POST',
  headers: myHeaders,
  mode: 'no-cors',
  body: VALUE
})
  .then(data => {
    console.log(data);
    fetchText();
    location.reload();
  })
  .catch((err) => {

    console.error(err);
  });

}
function deletecomment(id, user){
  if(idusercmt == user){
    fetch(url_comment + "/" + id, {
      method: 'DELETE'
      })
      .then(res => res.text()) // or res.json()
      .then(function(){
          var blogdele = document.querySelector('.data-id-' + id);
          if(blogdele){
              blogdele.remove();
          }
      })
  }else{
    alert("bạn không có quyền xóa!")
  }
}