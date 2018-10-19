const express = require("express");
const bodyparser = require("body-parser");
const app = express();

app.use(bodyparser.json());
//app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.urlencoded({extended:true}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const auth = require("./server/routes/auth");
app.use("/auth", auth);

const blog = require("./server/routes/blog");
app.use("/blog", blog);

app.use('/files',express.static(__dirname + '/uploads'));

app.listen(3000, err => {
    if (err) throw err;
    console.log("hani nasma3 fik 3al 3000");
});
