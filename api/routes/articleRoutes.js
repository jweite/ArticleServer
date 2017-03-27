'use strict';

module.exports = function(app) {
  var articleController = require('../controllers/articleController');

  // Define the REST routes (to controller methods) for article entity
  app.route('/articles')
    .get(articleController.list_all_articles)
    .post(articleController.create_an_article);

  app.route('/articles/:articleId')
    .get(articleController.read_an_article)
    .put(articleController.update_an_article)
    .delete(articleController.delete_an_article);
};
