'use strict';
// Set up mongo/mongoose

var mongoose = require('mongoose'),
  Article = mongoose.model('Articles');

exports.list_all_articles = function(req, res) {
  if (typeof(req.query.query) != "undefined") {
    var query = JSON.parse(req.query.query);
    Article.find(query, null, function (err, article) {
      if (err)
        res.send(err);
      res.json(article);
    });
  }
  else {
	  Article.find({}, function(err, article) {
		if (err)
		  res.send(err);
		res.json(article);
	  });
  }
};

exports.create_an_article = function(req, res) {
  var new_article = new Article(req.body);
  new_article.save(function(err, article) {
    if (err)
      res.send(err);
    res.json(article);
  });
};

exports.read_an_article = function(req, res) {
  Article.findById(req.params.articleId, function(err, article) {
    if (err)
      res.send(err);
    res.json(article);
  });
};

exports.update_an_article = function(req, res) {
console.log(req.params.articleId);
console.log(req.body);
  Article.findOneAndUpdate(req.params.articleId, req.body, {new: true}, function(err, article) {
    if (err)
      res.send(err);
    res.json(article);
  });
};

exports.delete_an_article = function(req, res) {
  Article.remove({
    _id: req.params.articleId
  }, function(err, article) {
    if (err)
      res.send(err);
    res.json({ message: 'Article successfully deleted' });
  });
};
