Article Server

- Based on the design/impl of https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd
- Adapted for a different datatype: articles

Since he doesn't document how it works, and I'm a newb to some of these technologies...
- Startup
	- Launch mongod
	- Launch server with npm run start
		- package.js defines the start command as nodemon server.js
			- nodemon is a dev tool we've added that watches the project source and auto-re-init's node on source file change.
			- Entry point is server.js
	- server.js
		- Pulls in Express and initializes an App object with it
		- Declares the port it will later listen on, pulling it from an env var if available
		- Pulls in Mongoose, the ODM
		- Pulls in the app's Article model
			- Defines the schema of an Article mongo/mongoose object
			- Plugs that schema into Mongoose under the name Articles
		- Sets mongoose to use native promises.  See http://mongoosejs.com/docs/promises.html
		- Connects to mongo.  (We really ought to define an on error callback, and probably defer listening until connection is effective.  See http://mongoosejs.com/docs/)
		- Plugs in a simple Express middleware func to always set browser required CORS enabling headers in the response.
		- Plugs in standard Express middleware funcs to parse certain types of request bodies automatically
		- Pulls in our app-defined routes module & call its function
			- Pulls in our app-defined controller module
				- Pulls in mongoose and gets an object representing the Article schema for use by the funcs it then defines.
			- Configures our app's routes into our Express App
		- Begins listening for http requests and servicing them
- Servicing http requests
	- Express matches http requests against the routes defined in articleRoutes, parses out any variable elements (id in this case) and invokes the controllers associated with those routes.
		- Rest routes to 
			- Get all articles: /articles
				- I adapted this to also accept a query url param: a JSON that matches the mongo API query format.
			- Get a single article by it's *mongo-assigned* _id /articles/21353152
				That's not the ID field I put in the article object schema! Use query syntax, above, for that.
			- Post a new article
			- Put updates to an existing article identified by its mongo-assigned _id
			- Delete an article identified by its mongo-assigned _id
- Postman
	- Use postman to easily interact with the article server.
	- Get all articles:  GET http://localhost:3000/articles.	(Empty array if there's no data yet.)
	- Post a new Article:	POST to http://localhost:3000/articles
		- Set a request header specifying JSON payload: Content-Type = application/json
		- Payload is of the form:
			{
			  "id": 6,
				"title": "The Sixth Title",
			  "body": "...",
			  "publication_date": "2017-03-24T04:00:00.000Z",
			  "creditQualities": ["IG"],
			  "regions": ["US","EU"],
			  "sectors": ["TMT","AUT"],
			  "tags": []
			}		
		- You'll see the mongo-defined fields (like _id) in the response
	- Get that article by it's mongo-defined _id:  GET http://localhost:3000/articles/<_idValue>
	- Query for articles:
		- By article's internal id: http://localhost:3000/articles?query={"id":"6"}
		- Articles in AUT sector:  .../articles?query={"sectors":"AUT"}
		- Highlighted articles:  http://localhost:3000/articles?query={"tags":"Highlighted"}
- Mongo Points
	- Mongo automagically creates the DB (ArticleDB, from the connection URI) and Collection (articles, after the schema name).
	- Use the mongo shell to see the db directly
		- use Articledb
		- List all articles: db.articles.find().pretty();
		- 
		

			
			
			
		
		
	
		
		
			
		
		

