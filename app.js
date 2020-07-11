var express = require("express");
var todoController = require("./controllers/todoController");
var app = express();
const hostname = "localhost";
const port = 3000;
//static files
app.use(express.static(__dirname + "/public"));
//set up template engine

app.set("view engine", "ejs");

//listen
todoController(app);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
