// CONNECTION ______________________________________________

require("dotenv").config();

var keys = require("./keys.js");
var inquirer = require("inquirer")

var mysql = require("mysql");

// const cTable = require('console.table');


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

function salesByDept() {  
    //display a summarized table
        // group & order by department id 

    var query = "SELECT departProd.department_id, departProd.department_name, departProd.over_head_costs, SUM(departProd.product_sales) as product_sales, (SUM(departProd.product_sales) - departProd.over_head_costs) as total_profit FROM (SELECT departments.department_id, departments.department_name, departments.over_head_costs, IFNULL(products.product_sales, 0) as product_sales FROM products RIGHT JOIN departments ON products.department = departments.department_name) as departProd GROUP BY department_id ORDER BY department_id";
    
    
    connection.query(query, function(err, res) {
        if (err) throw err;
        console.log();
        console.table(res)

    listMenuOptions()
    })
}


function createNewDept() {
    console.log();

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
