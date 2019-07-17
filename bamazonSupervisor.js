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
    console.log("--------------------------------------")
    listMenuOptions();
});



// PROMPTS/FUNCTIONS _____________________________________________________________

function listMenuOptions() {

    console.log("--------------------------------------")

    inquirer.prompt({

    // menu list in prompt
            
        name: "menu",
        type: "list",
        message: "Supervisor Menu Options",
        choices: ["View Product Sales by Department", "Create New Department", "Exit"]

    })

    .then(function(answer) {

        switch (answer.menu) {
            case "View Product Sales by Department":
                salesByDept();
                break;
        
            case "Create New Department":
                createNewDept();
                break;
        
            case "Exit":
                connection.end();
                break;

        }
    })     
}

function salesByDept() {  // ---------------THIS FUNCTION IS NOT WORKING YET.
    //display a summarized table
    var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, products.product_sales FROM products INNER JOIN departments ON products.department = departments.department_name";
    //GROUP BY department_name;????
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.table(res)
    //The `total_profit` column should be calculated on the fly using the difference between `over_head_costs` and `product_sales`. `total_profit` should not be stored in any database. You should use a custom alias.
    listMenuOptions()
    })
}


function createNewDept() {

    inquirer.prompt([
        {
            name: "newDepart",
            type: "input",
            message: "What department would you like to add?",  
        },
        {
            name: "overHead",
            type: "number",
            message: "Overhead cost for this department?"
        }
    ]).then(function(answer){
        var query = connection.query(
            "INSERT INTO departments SET ?",
            {
                department_name: answer.newDepart,
                over_head_costs: answer.overHead
            },

        function(err, res) {
            if (err) throw err;
            console.log();
            console.log("The new department has been added.")    
            listMenuOptions();

        })
    })
}
