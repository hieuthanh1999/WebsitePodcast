let url_viewblog = 'http://localhost:8000/post';
let url_viewcategory = 'http://localhost:8000/category';
let url_viewrank = 'http://localhost:8000/rank';
fetchText();

// như kiểu tính tổng 1 máng sô nguyên tố, nhưng mà a chưa biết trong mảng đấy số nào là số nguyên tốt
//thì a sẽ viết 1 hàm riêng để lọc ra thằng nào là thằng số nguyên tốt


async function fetchText() {
    let blog = await fetch(url_viewblog);
    let category = await fetch(url_viewcategory);
    let rank = await fetch(url_viewrank);

    // console.log(blog.status); // 200
    // console.log(blog.statusText); // OK

    if (blog.status === 200) {
        let blogs = await blog.json();
        let categorys = await category.json();
        let ranker = await rank.json();
        var categorypodcast = categorys.filter(function(category) {
            return category.type_category == "0";
        });
    function getBlog(){
        return new Promise(resolve => {
            setTimeout(function(){
                resolve(blogs)
            }, 500);
        })
    }
    function getCategoryByIds(userId){
        return new Promise(resolve => {
             var results = categorypodcast.filter(function (user) {
               return userId.includes(user.id);
             });
             setTimeout(function(){
                 resolve(results);
             });     
        });
     }
     function getRankByIds(userId){
        return new Promise(resolve => {
             var results = ranker.filter(function (user) {
               return userId.includes(user.id);
             });
             setTimeout(function(){
                 resolve(results);
             });     
        });
     }
     getBlog().then(function(blogs){
            var categoryId = blogs.map(function (blog) {
                return blog.id_category;
            });
            var rankId = blogs.map(function (blog) {
                return blog.ranker;
            });
            return getCategoryByIds(categoryId).then(function (categorys) {
                return getRankByIds(rankId).then(function (ranks) {
                    return {
                        category : categorys,
                        blog : blogs,
                        rank : ranks
                    };
                });
            });
        }).then(function(data){
           var html = '';
           var j = 1;
           console.log(data);
            data.blog.map(function (blog){
                var category = data.category.find(function (category){
                    return category.id === blog.id_category;
                });
                var rank = data.rank.find(function (rank){
                    return rank.id === blog.ranker;
                });
                html += `
                <tr class="id-blog-${blog.id}">
                <td data-label="STT">${j++}</td>
                <td data-label="Title">${blog.title}</td>
                <td data-label="Image"><img src="${blog.image}" alt=""></td>
                <td data-label="Category">${category.name}</td>
                <td data-label="Rank">${rank.name}</td>
                <td data-label="Content" id="limit">
                ${blog.content}
                </td>
                <td data-label="Sửa" class="right__iconTable"><a ><img onclick="update_blog(${blog.id})"
                            src="assets/icon-edit.svg" alt=""></a></td>
                <td data-label="Xoá" class="right__iconTable"><a ><img onclick="delete_blog(${blog.id})"
                            src="assets/icon-trash-black.svg" alt=""></a></td>
            </tr>
                `;
                document.getElementById('list-blog').innerHTML = html;
            })
        })
    }

}
    
function delete_blog(id){
    fetch(url_viewblog + "/" + id, {
    method: 'DELETE'
    })
    .then(res => res.text()) // or res.json()
    .then(function(){
        var blogdele = document.querySelector('.id-blog-' + id);
        if(blogdele){
            blogdele.remove();
        }
    })
    }
