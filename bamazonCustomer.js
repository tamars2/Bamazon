//dependencies
var mysql = require('mysql');
var prompt = require('prompt');

//connect to the mysql server
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "basketball",
  database: "top_songsDB"
});
//if we are connected, run showInventory
connection.connect(function(err) {
  if (err) throw err;
  showInventory();
});

//start the app
var showInventory = function() {
	//query the table and display all products in a somewhat
	//orderly manner (this could be done better)
	var query = "SELECT * FROM Bamazon.products;"
	//query the database
	connection.query(query, function(err, res){
		for (var i = 0; i <res.length; i++) {
			console.log("Item #" + res[i].item_id + " || " + res[i].product_name + " || " + res[i].department_name + " || " + res[i].price + " || " + res[i].stock_quantity + " units in stock.");
		}
	//begin the prompt
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
			//capture the results into variables we can use
			var itemID = result.item;
			var itemQuantity = result.quantity;
			//build our new query
			query = "SELECT * FROM Bamazon.products WHERE item_id=" + itemID;
			connection.query(query, function(err, res) {
				var qty = res[0].stock_quantity;
				var price = res[0].price;
				if (itemQuantity > qty) {
					console.log('Insufficient quantity!  Please select again.');
					showInventory();
				}
				else {
					var totalPrice = itemQuantity * price;
					//convert to a fixed decimal price
					var decimalPrice = totalPrice.toFixed(2);
					var newQuantity = qty - itemQuantity;
					//log the results
					console.log("---------------------------");
					console.log('Your order has been placed.');
					console.log("---------------------------");
					console.log("Your total price: " + decimalPrice);
					console.log("---------------------------");
					console.log("Thank you, come again! Press control+c to exit.");
					//make the update to the table
					connection.query("UPDATE Bamazon.products SET ? WHERE ?", [{
						stock_quantity: newQuantity
						}, {
						item_id: itemID
						}], function(err, res){});
				};
			});
		});
	});
};

