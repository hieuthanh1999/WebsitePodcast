// get api ra podcast
fetch(url_podcast)
    .then(response => response.json())
    .then(function (responses) {
       
       var htmls = responses.map(function (response) {
            return  `
            <div class="itemhome__post">
            <div class="item__img">
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
            <div class="item__title">
              <h3>${response.title}</h3>
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
    })
    .catch((error) => {
        console.error('Error:', error);
    });


// Get category
fetch(url_category_pod)
    .then(response => response.json())
    .then(function (responses) {
       
       var htmls = responses.map(function (response) {
            return  `
            <li><a href="${response.url}">${response.name}</a></li>
            `;
       });
       var html = htmls.join('');
       document.getElementById('category-podcast').innerHTML = html;
       document.getElementById('category-post').innerHTML = html;
    })
    .catch((error) => {
        console.error('Error:', error);
    });

