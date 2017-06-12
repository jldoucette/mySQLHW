var columnify = require('columnify');
var inquirer=require('inquirer');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'Bamazon'
});
var custQuantity;
var custSelectedID;
var costToCustomer;
var departmentName;

connection.connect(function(err){
    if(err) throw err;
});
function getProductList() {
var queryString='SELECT item_id,product_name,price from products';
connection.query(queryString, function (error, results) {
  if (error) {
      console.log(error);
  }
  else {
      console.log("\n");
      var columns = columnify(results, {
  config: {
    item_id: {
      minWidth: 20
    },
    product_name: {
        minWidth: 50
    },
    price: {
        minWidth:10
    }
  }
})
     console.log(columns); 
customerOptions();
}
});
}
 
function customerOptions() {
    
    inquirer.prompt([
        {
            name: "getID",
            message: "What is the ID of the Product you wish to purchase? "
        }, {
            name: "getQuantity",
            message: "What quanitity do you wish to buy? "
        }
        
        ]).then(function(validateSelection) {
            custQuantity=validateSelection.getQuantity;
            custSelectedID=validateSelection.getID;
var queryString='SELECT stock_quantity,price,department_name from products where item_id='+validateSelection.getID;
connection.query(queryString, function (error, results) {
  if (error) {
      console.log(error);
  }
  else {
      departmentName=results[0].department_name;

  if (results[0].stock_quantity>=validateSelection.getQuantity){
    costToCustomer=parseInt(custQuantity)*parseFloat(results[0].price);
      console.log("Congratuations! Your order has been placed!");
      console.log("Your total cost is: $"+parseFloat(costToCustomer).toFixed(2));
      updateQuantity();
      updateSales();
  }    
  else {
      console.log("Sorry, we do not have sufficient stock to complete your order.");
        continueShopping();
  }
  }      
});


  });
}

getProductList();

function updateQuantity() {
var queryString1="UPDATE products SET stock_quantity=(stock_quantity-"+custQuantity+") where item_id="+custSelectedID;
connection.query(queryString1, function (error, results) {
    if (error) {
      console.log(error);
    }
    else {
continueShopping();
    }         
});
}

function continueShopping() {
    
    inquirer.prompt([
        {
            type: "input",
            name: "continue",
            message: "Continue Shopping? Y or N"
        }
        
        ]).then(function(selection) {
            var custContinue=selection.continue.toLowerCase();
            if (custContinue=="y") {
     getProductList();
        }
        else {
            console.log("******************Thank you for shopping with us!******************");
        }
  });
}

function updateSales() {
var queryString='UPDATE products SET product_sales=product_sales+'+costToCustomer+' WHERE item_id='+custSelectedID;
connection.query(queryString, function (error, results) {
  if (error) {
      console.log(error);
  }        
});
var queryString='UPDATE departments SET total_sales=total_sales+'+costToCustomer+' WHERE department_name="'+departmentName+'"';
connection.query(queryString, function (error, results) {
  if (error) {
      console.log(error);
  }      
});
}