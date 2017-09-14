var mysql = require("mysql");

var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  // createProduct();
});

start();

function start() {
    connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log("Products in Bamazon ...\n");
    console.log(results);
    askCustomer();
  });

}

function updateStock(id, quantity, oldQuantity) {
  console.log("updating inventory ...");
  var query = connection.query(
  "UPDATE products SET ? Where ?",
  [
    {
      stock_quantity: oldQuantity-quantity
    },
    {
      item_id: id
    }
  ],
  function(err, res) {
    // console.log(res.affectedRows + " products updated!\n");
      // Call deleteProduct AFTER the UPDATE completes
    // deleteProduct();
  console.log("inventory updates");
  })
};

function askCustomer() {
  inquirer.prompt([
    {
      type:"input",
      name:"id",
      message:"What product ID do you want?",
      validate: function(value) {
                  if (isNaN(value) === false) {
                      return true;
                  }
                      return false;
            }
    },

    {
      type:"input",
      name:"quantity",
      message:"How many do you want to buy?",
      validate: function(value) {
                  if (isNaN(value) === false) {
                      return true;
                  }
                      return false;
            }
    }


    ]).then(function(answer){
      console.log(answer);
      connection.query("SELECT stock_quantity FROM products WHERE item_id = ?", [answer.id], function(err, results) {
        if (err) throw err;
        console.log(results);
        if (answer.quantity <= results[0].stock_quantity) {
          console.log("We have enough for you to buy.");
          //update query
            updateStock(answer.id, answer.quantity, results[0].stock_quantity);
          
          

          //else we do not have enough to purchase
            //refire ask customer
        }
      })
    })
}

