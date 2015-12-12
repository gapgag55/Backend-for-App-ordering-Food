var express = require('express'),
    app = express(),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/order');

var Schema = new mongoose.Schema({
    table: Number,
    food: []
});

var db = mongoose.model('MenuOrder', Schema);

app.use(express.static('./www'));
app.use(bodyParser.json());

app.get('/order', function(req, res) {
    db.find({}, function(err, data) {
    	if(err){
    		res.send(err);
    	}else{
        	res.json(data);
    	}
    });
});

app.put('/finish/:id', function(req, res){
	db.find({ _id: req.params.id }).remove(function(err, data){
		if(err){
			res.send(err);
		}else{
			res.json(data);
		}
	});
});

app.post('/neworder', function(req, res) {
    console.log(req.body);

    var create = new db({
        table: req.body.table,
        food: req.body.food
    });
    create.save(function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    })
});

app.get('*', function(req, res) {
    res.sendfile('./www/index.html');
});
app.listen(3000, function() {
    console.log('Server\s running on 3000');
});
