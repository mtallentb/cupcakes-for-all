"use strict";

let Handlebars = require('hbsfy/runtime'),
	cakeInventory = require('./bakery-factory'),
	cakeTemplate = require('../templates/cake-grid.hbs'),
	welcomeTemplate = require('../templates/welcome.hbs'),
	welcomeData = require('../templates/welcome-data.js');

//auto returns because onl y one
Handlebars.registerHelper("incrementer", (value) => parseInt(value) + 1);
Handlebars.registerPartial("footer", require('../templates/partials/footer.hbs'));


$("#welcome").append(welcomeTemplate(welcomeData));

var myObject =
        {"ircEvent": "PRIVMSG", "method": "newURI", "regex": "^http://.*"};

console.log("myObject", myObject);

function populatePage(stuff){
	let newDiv = document.createElement("div");
	newDiv.innerHTML = cakeTemplate(stuff);
	$("#cake-cards").append(newDiv);
}

cakeInventory.loadInventory()
.then(
	(inventoryFromLoadInventoryResolve) => {
		console.log("Cake Promise", inventoryFromLoadInventoryResolve);
		populatePage(inventoryFromLoadInventoryResolve);
	},
	(reject) => {
		console.log("SOMETHING WENT REALLY WRONG");
	});