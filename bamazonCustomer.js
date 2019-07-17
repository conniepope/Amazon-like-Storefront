// CONNECTION ______________________________________________

require("dotenv").config();

var keys = require("./keys.js");
var inquirer = require("inquirer")

var mysql = require("mysql");

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
    listProducts();
});

    // console.log("Selecting all products...\n");
    // connection.query("SELECT * FROM products", function(err, res) {
    
// PROMPTS/FUNCTIONS _____________________________________________________________

function listProducts() {
    
    var query = "SELECT product_name,price,stock_quantity FROM products";
    connection.query(query, function(err, res) {
        if (err) throw err;
        // console.log(res);
        console.log("--------------------------------------")
        inquirer.prompt(

    // list items available for purchase in prompt
            {
                name: "products",
                type: "rawlist",
                message: "Here's a list of our Outdoor Lifestyle products. What would you like to purchase? (Use arrow keys to select, then press Enter.)",
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
                console.log();
                //show item chosen, price, and quantity available of that item
                console.log("You have chosen the " + item.product_name + ".");

                console.log("This item costs $" + item.price + ".");
                //things tried: loop, res[i], res.price, res.products.price....
                quantity(item);
            })
        })
    })
};

function quantity(item) {
    // then prompt "How many wanted"
    console.log();
   inquirer.prompt(
       {
       name: "units",
       type: "number",
       message: "How many of this item would you like to purchase?",  
       }
   ).then(function(answer){
       // check # requested with inventory quantity
       if (answer.units <= item.stock_quantity) {
           var total = answer.units * item.price
       // if ok then list total cost of purchase "The total cost of purchase of [quantity] [product] is $[total]. Is this OK? (Y/n)"
           console.log();
           console.log("Your total for " + answer.units + " " + item.product_name + " is $" + total + ".")
           confirmation();
               // UPDATE DATABASE WITH NEW QUANTITY
            var query = connection.query(
                "UPDATE products SET ? WHERE ?",
                [
                {
                    stock_quantity: (item.stock_quantity - answer.units)
                },
                {
                    product_name: item.product_name
                }
                ],
            )
            // console.log(query)
        } else {
            console.log("We currently have only " + item.stock_quantity + " in stock. Please order a smaller quantity or check back at a later time.");
            listProducts();
        }
    
    })
}

function confirmation() {

    inquirer.prompt(
        {
            name: "confirm",
            type: "confirm",
            message: "Would you like to continue?"
        }
    //if yes, "Thank you for your purchase"

    ).then(function(answer) {
        if (answer.confirm === true){
            console.log();
            console.log("Thank you for your purchase!")
    //when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column. --------------------------------- IN PROGRESS

            more();
        } else {
            // go back to beginning?
            inquirer.prompt(
                {
                    name: "continue_confirm",
                    type: "confirm",
                    message: "No problem. Is there anything else you would like?"
                }
            ).then(function(answer) {
                if (answer.continue_confirm === true) {
                    listProducts();
                } else {
                    console.log("Have a great day! Come again!");
                    connection.end();
                }
            })        }
    })
}

function more() {

    // prompt: Would you like to continue? (Y/n)
    inquirer.prompt(
        {
            name: "continue_confirm",
            type: "confirm",
            message: "Would you like to make another purchase?"
        }
    ).then(function(answer) {
        if (answer.continue_confirm === true) {
            listProducts();
        } else {
            console.log("Have a great day! Come again!");
            console.log();
            connection.end();
        }
    })
}

