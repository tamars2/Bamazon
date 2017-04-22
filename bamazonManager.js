//dependencies
var inquirer = require('inquirer');
var mysql = require('mysql');
var prompt = require('prompt');
//establish connection
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "basketball",
  database: "top_songsDB"
});
//build the manager console, take manager input and 
//execute appropriate function
var runManagerConsole = function() {
	inquirer.prompt({
		type: "list",
		name: "manager",
		message: "Welcome, manager.  What would you like to do?",
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
	}).then(function(user) {
		switch(user.manager) {
			case "View Products for Sale":
				viewProducts(true);
				break;
			case "View Low Inventory":
				viewLowInventory();
				break;
			case "Add to Inventory":
				addInventory();
				break;
			case "Add New Product":
				addNewProduct();
				break;
			default:
				console.log('please select an option');
				break;
		}
	});
}
//this is the first option in the manager menu
function viewProducts(bool) {
	var query = "SELECT * FROM Bamazon.products;"
	//query the database
	connection.query(query, function(err, res){
		for (var i = 0; i <res.length; i++) {
			console.log("Item #" + res[i].item_id + " || " + res[i].product_name + " || " + res[i].department_name + " || " + res[i].price + " || " + res[i].stock_quantity + " units in stock.");
		}
		if (bool) {
			runManagerConsole();
		}
	});
}
//second menu option shows low inventory items
function viewLowInventory() {
	var query = "SELECT * FROM Bamazon.products WHERE stock_quantity < 5";
	connection.query(query, function(err, res){
		console.log("LOW STOCK ITEMS");
		console.log("---------------");
		for (var i = 0; i <res.length; i++) {
			console.log("Item #" + res[i].item_id + " || " + res[i].product_name + " || " + res[i].department_name + " || " + res[i].price + " || " + res[i].stock_quantity + " units in stock.");
		}
		console.log("---------------");
	runManagerConsole();
	});
}
//third menu option allows manager to replenish inventory
function addInventory() {
	prompt.start();
	console.log("---------------");
	prompt.get([{
		name: 'item',
		description: 'Which item would you like to replenish?',
		type: 'integer',
		required: true
	}, {
		name: 'quantity',
		description: 'How many would you like to add?',
		type: 'integer',
		required: true
	}], function(err, result) {
			var itemID = result.item;
			var replenish = result.quantity;
			var query = "SELECT stock_quantity FROM Bamazon.products WHERE item_id=" + itemID;
			connection.query(query, function(err, res) {
				var qty = res[0].stock_quantity;
				//update quantity in the table
				var updatedQuantity = replenish + qty;
				connection.query("UPDATE Bamazon.products SET ? WHERE ?", [{
				stock_quantity: updatedQuantity
				}, {
				item_id: itemID
				}], function(err, res){
					runManagerConsole();
				});
			});
		
		})
}

//fourth menu option to add a new product to the table
function addNewProduct() {
	inquirer.prompt([
		{
			type: "input",
			name: "itemName",
			message: "What is the name of the item you would like to add?"
		},
		{
			type: "list",
			name: "department",
			message: "Which department?",
			choices: ["beer", "bourbon"]
		},
		{
			type: "input",
			name: "price",
			message: "What is the unit price? (please provide dollars and cents)"
		},
		{
			type: "input",
			name: "quantity",
			message: "How many units?"
		}

	]).then(function(item) {
		// quotes hell, will break this down into += if I have time
		var query = 'INSERT INTO Bamazon.products (product_name, department_name, price, stock_quantity) VALUES ("' + item.itemName + '", "' + item.department + '", ' + item.price + ', ' + item.quantity + ');'
		console.log(query);
		connection.query(query, function(err, res) {
			console.log("Your item has been added!");
			runManagerConsole();
		})
	})
}

runManagerConsole();