
let url_viewpodcast = 'http://localhost:8000/podcast';
let url_viewcategory = 'http://localhost:8000/category';
let url_viewcourse = 'http://localhost:8000/course';
fetchPodcast();

async function fetchPodcast() {

    let podcast = await fetch(url_viewpodcast);
    let category = await fetch(url_viewcategory);
    let course = await fetch(url_viewcourse);
    // console.log(blog.status); // 200
    // console.log(blog.statusText); // OK

    if (podcast.status === 200) {
        let blogs = await podcast.json();
        let categorys = await category.json();
        let courses = await course.json();
        var categorypodcast = categorys.filter(function(category) {
            return category.type_category == "1";
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
     function getCourseByIds(userId){
        return new Promise(resolve => {
             var results = courses.filter(function (user) {
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
            var courseId = blogs.map(function (blog) {
                return blog.id_course;
            });
            return getCategoryByIds(categoryId).then(function (categorys) {
                return getCourseByIds(courseId).then(function (courses) {
                    return {
                        category : categorys,
                        blog : blogs,
                        course : courses
                    };
                });
            });
         
         
        }).then(function(data){
            console.log(data);
           var html = '';
           var j = 1;
            data.blog.map(function (blog){
                var category = data.category.find(function (category){
                    return category.id === blog.id_category;
                });
                var course = data.course.find(function (course){
                    return course.id === blog.id_course;
                });
           
                html += `
                <tr class="id-podcast-${blog.id}">
                <td data-label="STT">${j++}</td>
                <td data-label="Title">${blog.title}</td>
                <td data-label="Image"><img src="${blog.image}" alt=""></td>
                <td data-label="Audio">
                <audio controls>
                  <source src="${blog.audio}">
                </audio></td>
                <td data-label="Category">${category.name}</td>
                <td data-label="Course">${course.name}</td>
                <td data-label="Content" id="limit">
                ${blog.content}
                </td>
                <td data-label="Sửa" class="right__iconTable"><a><img onclick="update_podcast(${blog.id})"
                            src="assets/icon-edit.svg" alt=""></a></td>
                <td data-label="Xoá" class="right__iconTable"><a  ><img onclick="delete_podcast(${blog.id})"
                            src="assets/icon-trash-black.svg" alt=""></a></td>
            </tr>
                `;
                document.getElementById('list-pod-cast').innerHTML = html;
            })
        })
    }
}


    
function delete_podcast(id){
    fetch(url_viewpodcast + "/" + id, {
    method: 'DELETE'
    })
    .then(res => res.text()) // or res.json()
    .then(function(){
        var blogdele = document.querySelector('.id-podcast-' + id);
        if(blogdele){
            blogdele.remove();
        }
    })
    }
