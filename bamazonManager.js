// CONNECTION ______________________________________________

require("dotenv").config();

var keys = require("./keys.js");
var inquirer = require("inquirer")

var mysql = require("mysql");

const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",
    password: keys.password,
    database: "bamazon"
})

connection.connect(function(err) {
    if (err) throw err;
    // console.log("connected as id " + connection.threadId);
    console.log("--------------------------------------")
    listMenuOptions();
});

// PROMPTS/FUNCTIONS _____________________________________________________________

function listMenuOptions() {

    inquirer.prompt({

    // menu list in prompt
            
        name: "menu",
        type: "list",
        message: "Manager Menu Options",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]

    })

    .then(function(answer) {

        switch (answer.menu) {
            case "View Products for Sale":
                productsList();
                break;
        
            case "View Low Inventory":
                lowInventory();
                break;
        
            case "Add to Inventory":
                addToInventory();
                break;
        
            case "Add New Product":
                addNewProduct();
                break;
        
            case "Exit":
                connection.end();
                break;
        }
        
    })
        
}

function productsList() {
    //list every available item: the item IDs, names, prices, and quantities.
    var query = "SELECT id,product_name,price,stock_quantity FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log();
        console.table(res);
        connection.end();
    })
}

function lowInventory() {
    //list all items with an inventory count lower than five
    var query = "SELECT id,product_name,price,stock_quantity FROM products WHERE stock_quantity < 5";
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res);
    })
}

function addToInventory() {
   // display a prompt that will let the manager "add more" of any item currently in the store.
   inquirer.prompt({

    // product list in prompt
            
        name: "prducts",
        type: "rawlist",
        message: "Which item would you like to ADD MORE to the inventory?",
        choices: function() {
            var choiceArray = [];
            for (var i = 0; i < res.length; i++) {
                choiceArray.push(res[i].product_name);
            }
            return choiceArray;
            },
        }

    ).then(function(answer) {

        var query = "SELECT product_name,price,stock_quantity FROM products WHERE ?";
        connection.query(query, {product_name: answer.products}, function(err, res) {
            if (err) throw err;
            var item = res[0];
            //show item chosen, price, and quantity available of that item
            console.log("You have chosen the " + item.product_name + ".");
        
            inquirer.prompt(
                {
                name: "units",
                type: "number",
                message: "How many would you like to add?",  
                }
            ).then(function(answer){
                var total = (stock_quantity + answer.units);
                var query = connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                    {
                        stock_quantity: total
                    },
                    {
                        product_name: item.product_name
                    }
                    ],
                )
                console.log("You now have " + total + item.product_name + " in stock.")
            })
        })   
    })
}

function addNewProduct() {
    //add a completely new product to the store
    inquirer.prompt(
        {
        name: "newProduct",
        type: "input",
        message: "What product would you like to add to the store?",  
        }
    ).then(function(answer){
        var query = "INSERT INTO products (product_name, department, price, stock_quantity) VALUES (?, ?, ?, ?)";
        connection.query(query,
        )
        
    })
} 
