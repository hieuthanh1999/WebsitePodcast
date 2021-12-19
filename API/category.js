
function start() {
    getApi(url_category_pod, getCategory);
}
start();
  
//Get Category Blog And Podcast

function getCategory(responses){
    var blog = responses.filter(function (person) { return person.type_category == "0"});
    var podcast = responses.filter(function (person) { return person.type_category == "1"});
    if(blog){
      var htmls = blog.map(function (response) {
        return  `
          <li><a href="${response.url}">${response.name}</a></li>
          `;
        });
        var html = htmls.join('');
        document.getElementById('category-post').innerHTML = html;
    }
    if(podcast){
      var htmls = podcast.map(function (response) {
        return  `
          <li><a href="${response.url}">${response.name}</a></li>
          `;
        });
        var html = htmls.join('');
        document.getElementById('category-podcast').innerHTML = html;
      }
  }
  