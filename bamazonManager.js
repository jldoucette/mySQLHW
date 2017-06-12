var columnify = require('columnify');
var inquirer=require('inquirer');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'Bamazon'
});

function managerOptions() {
    
    inquirer.prompt([
        {
   type: "list",
   name: "mgroption",
   message: "Manager Functions (select one)",
   choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
 }
    
        
        ]).then(function(selection) {
         
            getChoice=selection.mgroption;
            if(getChoice=="View Products for Sale") {
                mgrViewProducts();
            }
            if(getChoice=="View Low Inventory") {
                mgrViewLowInventory();
            }    
            if (getChoice=="Add to Inventory"){
                mgrAddInventory();
            }
            if (getChoice=="Add New Product"){
                mgrAddProduct();
            }
});
}  

function mgrAddInventory() {

inquirer.prompt([
        {
   type: "input",
   name: "lowinventoryitem",
   message: "Inventory Management - Select Item to Restock:",
 },
       {
   type: "input",
   name: "lowinventoryqty",
   message: "Inventory Management - Select Quantity to Order:",
 }
        ]).then(function(selection) { 
            var inventoryReplenishQty=selection.lowinventoryqty;
            var inventoryItem=selection.lowinventoryitem;
var queryString="UPDATE products SET stock_quantity=(stock_quantity+"+inventoryReplenishQty+") where item_id="+inventoryItem;
connection.query(queryString, function (error, results) {
            if (error) {
            console.log(error);
            }
            else {
              managerOptions();
            }         
        });
    }); 
    }

function mgrViewProducts() {
var queryString='SELECT item_id,product_name,price,stock_quantity from products';
connection.query(queryString, function (error, results) {
  if (error) {
      console.log(error);
  }
  else {
    console.log("-------------ITEMS FOR SALE-------------");
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
    },
    stock_quantity: {
        minWidth:10
    }
  }
})
     console.log(columns); 
managerOptions();
}
});
}

function mgrViewLowInventory() {
var queryString='SELECT item_id,product_name,price,stock_quantity from products where stock_quantity<5';
connection.query(queryString, function (error, results) {
  if (error) {
      console.log(error);
  }
  else {
      console.log("-------------LOW STOCK ITEMS-------------");
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
    },
    stock_quantity: {
        minWidth:10
    }
  }
})
     console.log(columns); 
managerOptions();
}
});
}

function mgrAddProduct() {

inquirer.prompt([
        {
   type: "input",
   name: "newitemname",
   message: "Add Product --- Enter Product Name:"
 },
       {
   type: "input",
   name: "newitemprice",
   message: "Add Product --- Enter Product Price:"
 },
      {
   type: "input",
   name: "newitemquantity",
   message: "Add Product --- Enter Quantity Available:"
 },
  {
   type: "input",
   name: "newitemdepartment",
   message: "Add Product --- Enter Department:"
 }
        ]).then(function(selection) { 
var queryString="INSERT INTO products (product_name, price, stock_quantity, department_name,product_sales) VALUES ('"+
selection.newitemname+"', "+selection.newitemprice+", "+selection.newitemquantity+", '"+selection.newitemdepartment+"',0)";
connection.query(queryString, function (error, results) {
            if (error) {
            console.log(error);
            }
            else {
              managerOptions();
            }         
        });
    }); 
}


managerOptions();
