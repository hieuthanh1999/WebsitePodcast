// jQuery Plugin: http://flaviusmatis.github.io/simplePagination.js/
var items = jQuery("#postItem #post-item").length;
    console.log(items);
    var numItems = items;
    var perPage = 6;

    items.slice(perPage).hide();

    jQuery('#pagination-container').pagination({
        items : numItems,
        itemsOnPage: perPage,
        prevText: "&laquo;",
        nextText: "&raquo;",
        onPageClick: function (pageNumber) {
            var showFrom = perPage * (pageNumber - 1);
            var  showTo  =  showFrom  +  perPage ;
            items.hide().slice(showFrom, showTo).show();
        }
    });