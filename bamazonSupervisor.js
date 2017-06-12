var columnify = require('columnify');
var inquirer=require('inquirer');
var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'Bamazon'
});

function supervisorOptions() {
    
    inquirer.prompt([
        {
   type: "list",
   name: "supoption",
   message: "Supervisor Functions (select one)",
   choices: ["View Product Sales by Department", "Create New Department"]
 }
    
        
        ]).then(function(selection) {
         
            getChoice=selection.supoption;
            if(getChoice=="View Product Sales by Department") {
                supViewSales();
            }
            if(getChoice=="Create New Department") {
                supCreateDept();
            }    
});
}  



function supViewSales() {
var queryString='SELECT department_id,department_name, over_head_costs, total_sales, total_sales-over_head_costs AS total_profit from departments';
connection.query(queryString, function (error, results) {
  if (error) {
      console.log(error);
  }
  else {
    console.log("-------------STORE SALES SUMMARY-------------");
      var columns = columnify(results, {
  config: {
    department_id: {
      minWidth: 10
    },
    department_name: {
        minWidth: 40
    },
    over_head_costs: {
        minWidth: 15
    },
    total_sales: {
        minWidth: 15
    },

    total_profit: {
        minWidth:10
    }
  }
})
     console.log(columns); 
supervisorOptions();
}
});
}

function supCreateDept() {

inquirer.prompt([
        {
   type: "input",
   name: "newdeptname",
   message: "Add Department --- Enter New Department Name:"
 },
       {
   type: "input",
   name: "newdeptoverhead",
   message: "Add Department --- Enter Department Overhead Costs:"
 }
        ]).then(function(selection) { 
var queryString="INSERT INTO departments (department_name, over_head_costs,total_sales) VALUES ('"+selection.newdeptname+"',"+selection.newdeptoverhead+",0)";
connection.query(queryString, function (error, results) {
            if (error) {
            console.log(error);
            }
            else {
              supervisorOptions();
            }         
        });
    }); 
}


supervisorOptions();