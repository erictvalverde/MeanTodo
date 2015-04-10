
//Set up ==========================================================================================

var express        = require('express'), 
	app            = express(),                   // Create our app with express
	mongoose       = require('mongoose'),		  // Mongoose for mongo db	
	morgan         = require('morgan'),			  // Log requests to the console (express 4)
	bodyParser     = require('body-parser'),      // Pull information from html POST (express 4)
	methodOverride = require('method-override');  // Simulate DELETE and PUT (express4)


//Mongoose configuration ===========================================================================

mongoose.connect('mongodb://localhost:27017/meantodo');        //Connecting to local mondodb meantodo

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

//Application ======================================================================================

app.get('/', function(req, res){
	res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


//define todo Model  ===============================================================================

var Todo = mongoose.model('Todo', {
	text : String
});


//Express API Routes  ===============================================================================


//Get all todos

app.get('/api/todos', function(req, res){

	//use mongoose to get all todos in the db
	Todo.find(function(err, todos){
		//if there is an error, nothing after err.send will excute
		if(err)
			res.send(err);
		
		//if suucess return all todos in json format
		res.json(todos)
	});

});//app.get

//create a todo and send back all todos after creation

app.post('/api/todos', function(req, res){

	//Create a todo, informatin comes from angular Ajax request
	Todo.create({
		text : req.body.text,
		done : false
	}, function(err, todo){

		if(err)
			res.send(err);

		res.json(todo)

		// //get and return all todos after you create another
		// Todo.find(function(err, todos){
		// 	//if there is an error, nothing after err.send will excute
		// 	if(err)
		// 		res.send(err);
		
		// 	//if suucess return all todos in json format
		// 	res.json(todos)
		// });
	});

});//app.post


//Delete a todo

app.delete('/api/todos/:todo_id', function(req, res){

	Todo.remove({
		_id : req.params.todo_id
	}, function(err, todo){

		if(err)
			res.send(err);

		res.json(todo);

		// //get and return all todos after the one been deleted
		// Todo.find(function(err, todos){
		// 	//if there is an error, nothing after err.send will excute
		// 	if(err)
		// 		res.send(err);
		
		// 	//if suucess return all todos in json format
		// 	res.json(todos)
		// });

	});


});//app.delete



// listen (start app with node server.js) ==========================================================
app.listen(8080);
console.log("App listening on port 8080");


