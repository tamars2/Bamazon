var mysql = require('mysql');
var prompt = require('prompt');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "basketball",
  database: "top_songsDB"
});

connection.connect(function(err) {
  if (err) throw err;
  showInventory();
});

var showInventory = function() {
	var query = "SELECT * FROM Bamazon.products;"
	connection.query(query, function(err, res){
		for (var i = 0; i <res.length; i++) {
			console.log("Item #" + res[i].item_id + " || " + res[i].product_name + " || " + res[i].department_name + " || " + res[i].price + " || " + res[i].stock_quantity + " units in stock.");
		}
	prompt.start();

	prompt.get([{
		name: 'item',
		description: 'Which item would you like to purchase?',
		type: 'integer',
		required: true
		}, {
		name: 'quantity',
		description: 'How many?',
		type: 'integer',
		required: true
		}], function (err, result) {
			var itemID = result.item;
			var itemQuantity = result.quantity;
			query = "SELECT stock_quantity FROM Bamazon.products WHERE item_id=" + itemID;
			connection.query(query, function(err, res) {
				// console.log(JSON.parse(res.stock_quantity));
				// prompt.start();
			});
			// console.log(itemID + " || " + itemQuantity);
			// console.log(result.item + " || " + result.quantity);
		});
	
	});
};

// prompt.get(['Which item would you like to purchase?'], function (err, result) {
// 		console.log(result);
// 	});
// prompt.start();

// prompt.get(['username', 'email'], function (err, result) {
//     // 
//     // Log the results. 
//     // 
//     console.log('Command-line input received:');
//     console.log('  username: ' + result.username);
//     console.log('  email: ' + result.email);
//   });