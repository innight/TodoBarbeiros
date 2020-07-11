$(document).ready(function () {
  $("#form-insert").on("submit", function () {
    var item = $("form input");
    var todo = { item: item.val() };
    alert(todo);
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

  $(".delete").click(function () {
    var id = $(this).attr("id");
    $.ajax({
      type: "DELETE",
      url: "/todo/" + id,
      success: function (data) {
        //do something with the data via front-end framework
        location.reload();
      },
    });
  });

  $("#form-update").on("submit", function () {
    var item = $("form input");
    var todo = { item: item.val() };
    alert(todo);
    $.ajax({
      method: "PUT",
      url: "/todo-detail/5f09eebf2d365d2ec49d1444",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: {
        item: todo.item,
      },
      success: function (data) {
        console.log(data);
        //do something with the data via front-end framework
        location.reload();
      },
    });

    return false;
  });
});
