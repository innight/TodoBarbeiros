var bodyParser = require("body-parser");
var mongoose = require("mongoose");

const { urlencoded } = require("body-parser");
const { response } = require("express");

mongoose.set("useUnifiedTopology", true);
mongoose.connect(
  "mongodb+srv://jsemedo:Password01@cluster0-lj9mw.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);
//create table
var barbeiroShop = new mongoose.Schema({
  name: String,
  location: String,
  openHour: String,
  closeHour: String,
});

var todoSchema = new mongoose.Schema({
  item: String,
  // description: {
  //   type: String
  // }
});

var Todo = mongoose.model("Todo", todoSchema);
var BarbeiroShop = mongoose.model("BarbeiroShop", barbeiroShop);

//SEED
/*
var itemOne = Todo({ item: "Test" }).save(function (err) {
  if (err) throw err;
  console.log("item saved BD ");
});
*/

//INSERT
/*
var itemTwo = BarbeiroShop({
  name: "Test2",
  location: "Lisbon",
  openHour: "09:00",
  closeHour: "18:00",
}).save(function (err) {
  if (err) throw err;
  console.log("item saved BD ");
});
*/
var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {
  app.get("/barbeiro/", function (req, res) {
    BarbeiroShop.find({}, function (err, data) {
      if (err) throw err;
      res.json({ barbeiroShops: data });
    });
  });

  app.get("/barbeiro/:name", function (req, res) {
    let param = req.params.name;
    BarbeiroShop.find({ name: new RegExp(`${param}$`, "i") }, function (
      err,
      data
    ) {
      if (err) throw err;
      res.json({ barbeiroShops: data });
    });
  });

  //INSERT FORM
  app.post("/barbeiro", urlencodedParser, function (req, res) {
    var newBarbeiro = BarbeiroShop(req.body).save(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
  });
  app.get("/todo", function (req, res) {
    Todo.find({}, function (err, data) {
      if (err) throw err;
      //      console.log({ todos: data });
      res.render("todo", { todos: data });
    });
  });

  app.delete("/barbeiro/", function (req, res) {
    Todo.find({ item: req.params.item.replace(/\-/g, " ") }).deleteOne(
      function (err, data) {
        if (err) console.log(err);
        res.json(data);
      }
    );
  });

  app.post("/todo", urlencodedParser, function (req, res) {
    var newTodo = Todo(req.body).save(function (err, data) {
      if (err) throw err;
      res.json(data);
    });
    /*
    var todo = new Todo(req.body);
    try {
      todo.save();
      res.status(201).send(todo);
    } catch (e) {
      res.status(500).send(e);
    }
    */
  });

  app.delete("/todo/:id", function (req, res) {
    const id = req.params.id;
    console.log(id);
    Todo.findById(id).deleteOne(function (err, data) {
      if (err) console.log(err);
      res.json(data);
    });
  });
  app.get("/todo-detail/:id", function (req, res) {
    const id = req.params.id;
    Todo.findById(id, function (err, data) {
      if (err) throw err;
      res.render("todo-detail", { todos: data });
    });
  });

  app.put("/todo-detail/:id", urlencodedParser, function (req, res) {
    const id = req.params.id;
    Todo.findByIdAndUpdate(id, req.body, function (err, data) {
      if (err) throw err;
      console.log("entrou" + id);
      res.render("todo-detail", { todos: data });
    });
  });
};

/*
const blog_details = (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("blogs/details", { blog: result, title: "Blog Details" });
    })
    .catch((err) => {
      res.status(404).render("404", { title: "Blog not Found" });
    });
};
*/
