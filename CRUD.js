var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "top1000"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  // createProduct();
});

// function createProduct() {
//   console.log("Inserting a new product...\n");
//   var query = connection.query(
//     "INSERT INTO products SET ?",
//     {
//       flavor: "Rocky Road",
//       price: 3.0,
//       quantity: 50
//     },
//     function(err, res) {
//       console.log(res.affectedRows + " product inserted!\n");
//       // Call updateProduct AFTER the INSERT completes
//       updateProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function updateProduct() {
//   console.log("Updating all Rocky Road quantities...\n");
//   var query = connection.query(
//     "UPDATE products SET ? WHERE ?",
//     [
//       {
//         quantity: 100
//       },
//       {
//         flavor: "Rocky Road"
//       }
//     ],
//     function(err, res) {
//       console.log(res.affectedRows + " products updated!\n");
//       // Call deleteProduct AFTER the UPDATE completes
//       deleteProduct();
//     }
//   );

//   // logs the actual query being run
//   console.log(query.sql);
// }

// function deleteProduct() {
//   console.log("Deleting all strawberry icecream...\n");
//   connection.query(
//     "DELETE FROM products WHERE ?",
//     {
//       flavor: "strawberry"
//     },
//     function(err, res) {
//       console.log(res.affectedRows + " products deleted!\n");
//       // Call readProducts AFTER the DELETE completes
//       readProducts();
//     }
//   );
// }



  // connection.query("SELECT * FROM songs WHERE artist_name = 'Mariah Carey'", function(err, res) {
  //   if (err) throw err;
  //   // Log all results of the SELECT statement
  //   console.log("Selecting all Mariah Carey songs in DB ...\n");
  //   console.log(res);
  //   connection.end();
  // });

  connection.query("SELECT count(*), artist_name FROM songs GROUP BY artist_name HAVING COUNT(*) > 1", function(err, res) {
    if (err) throw err;
    // Log all results of the SELECT statement
    console.log("Selecting all Mariah Carey songs in DB ...\n");
    console.log(res);
    connection.end();
  });


// Query within a specific range
// SELECT * FROM top5000 WHERE year >= 1980 AND year <+ 1989

// Query which searches for a specific song in the top 5000


// SELECT top5000.artist, top5000.year, top5000, albums.albums
// FROM top5000
// INNER JOIN albums ON top5000.year = albumsyear AND top5000.artist = albums.artist;

