let url_viewblog = 'http://localhost:8000/post';
let url_viewcategory = 'http://localhost:8000/category';
fetchText();
async function fetchText() {
    let blog = await fetch(url_viewblog);
    let category = await fetch(url_viewcategory);

    // console.log(blog.status); // 200
    // console.log(blog.statusText); // OK

    if (blog.status === 200) {
        let blogs = await blog.json();
        let categorys = await category.json();
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
     getBlog().then(function(blogs){
            var categoryId = blogs.map(function (blog) {
                return blog.id_category;
            });
            return getCategoryByIds(categoryId).then(function (categorys) {
                return {
                    category : categorys,
                    blog : blogs,
                };
            });
        }).then(function(data){
           var html = '';
           var j = 1;
            data.blog.map(function (blog){
                var category = data.category.find(function (category){
                    return category.id === blog.id_category;
                });
                html += `
                <tr>
                <td data-label="STT">${j++}</td>
                <td data-label="Title">${blog.title}</td>
                <td data-label="Image"><img src="${blog.image}" alt=""></td>
                <td data-label="Category">${category.name}</td>
                <td data-label="Rank">${blog.ranker}</td>
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


