'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  id: {
	type: Number,
	Required: 'You must include the id number of the article'  
  },
  title: {
    type: String,
    Required: 'You must include the title of the article'
  },
  body: {
    type: String,
    Required: 'You must include the body of the article'
  },
  publication_date: {
    type: Date,
    Required: 'You must include the publication date of the article'
  },
  tags: {
	type: [String]
  },
  sectors: {
	type: [String]
  },
  regions: {
	type: [String]
  },
  creditQualities: {
	type: [String]
  },
  author: {
	type: String
  },
  
});

module.exports = mongoose.model('Articles', ArticleSchema);