'use strict';

var mongoose = require('mongoose'),
    Category = mongoose.model('Category');

Category.find({}).remove(function() {
	Category.create({ 
		name : 'Food'
	}, {
		name : 'Transport'
	}, {
		name : 'Telephone'
	}, function(err) {
			console.log('finished populating categories');
		}
	);
});