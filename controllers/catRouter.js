var express = require('express');
var catRouter = express.Router();
var cats = require('../models/cats');
var bodyParser = require('body-parser');

catRouter.use(bodyParser.urlencoded({extended: false}))

catRouter.get('/', function(req, res){
  // INDEX
  res.render('cats/index', {cats: cats})
})

catRouter.get('/new', function(req, res) {
  // NEW
  res.render('cats/new');
});

catRouter.post('/', function(req, res) {
  // CREATE
  var newCat = {};
  newCat.name = req.body.name;
  newCat.appearance = req.body.appearance;
  newCat.personality = req.body.personality;
  newCat.imageURL = req.body.imageURL;
  cats.catList.push(newCat);
  res.redirect('/')
});

catRouter.get('/:id', function(req, res){
  // SHOW
  res.render('cats/show', {cat: cats.catList[req.params.id-1], id: (req.params.id)});
})

catRouter.get('/:id/edit', function(req, res) {
  // EDIT
  res.render('cats/edit', {cat: cats.catList[req.params.id - 1], id: (req.params.id - 1)});
});

catRouter.post('/:id', function(req, res) {
  // UPDATE
  var updateCat = cats.catList[req.params.id];
  updateCat.name = req.body.name;
  updateCat.appearance = req.body.appearance;
  updateCat.personality = req.body.personality;
  updateCat.imageURL = req.body.imageURL;
  res.redirect('/')
});

catRouter.post('/:id/delete', function(req, res) {
  // DELETE
  var newArray = [];
  for(i in cats.catList){
      if(parseInt(i)+1 != req.params.id) {
      newArray.push(cats.catList[i]);
    }
  }
  cats.catList = newArray;
  res.redirect('/cats');
});

module.exports = catRouter;

