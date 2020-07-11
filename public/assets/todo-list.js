$(document).ready(function () {
  $("form").on("submit", function () {
    var item = $("form input");
    var todo = { item: item.val() };

    $.ajax({
      type: "POST",
      url: "/todo",
      data: todo,
      success: function (data) {
        //do something with the data via front-end framework
        location.reload();
      },
    });

    return false;
  });

  $("td").click(function () {
    var id = $(this).text();
    //console.log($(this).text());
    //var item = $(this).text().replace(/ /g, "-");
    $.ajax({
      type: "DELETE",
      url: "/todo/" + id,
      success: function (data) {
        //do something with the data via front-end framework
        location.reload();
      },
    });
  });

  $("#update-form").on("submit", function () {
    console.log("oasdsadas");
    var item = $("form input");
    var todo = { item: item.val() };

    $.ajax({
      type: "PUT",
      url: "/todo-detail/",
      data: todo,
      success: function (data) {
        //do something with the data via front-end framework
        location.reload();
      },
    });

    return false;
  });
});
