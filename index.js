//Categories for blogs
var options = {
    url: "https://api.blog.redberryinternship.ge/api/categories",
    method: "GET",
    timeout: 0,
  };
  $.ajax(options).done(function(data) {
    $.each(data.data, function(index, category) {
        var buttonId = "category" + category.id;

        $("#" + buttonId)
        .text(category.title)
        .css({
            "color": category.text_color,
            // "background-color": category.background_color,
        });
    });
});