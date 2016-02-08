var express = require('express');
var app = express();
var cats = require('./models/cats.js');

var expressLayouts = require('express-ejs-layouts');
var catRouter = require('./controllers/catRouter');

// Application Settings
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(expressLayouts);
app.use("/cats", catRouter)
app.use(express.static(__dirname + "/public"));

// Routes

app.get('/', function(req, res){
  res.render('index', {welcome: "Neko Atsume Cat Guide"});
});


app.listen('3000', function(){
  console.log('running on port 3000');
});



