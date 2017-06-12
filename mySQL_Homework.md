# Jonathan's Bamazon Homework (MySQL Node Homework)

There are 3 Node applications to control the store, and a MySQL Database with 2 tables. 

##MySQL Tables 
The two tables are products and departments. 

They are structured as follows:
Departments 
Field			Type			Null	Key	Default	Extra
department_id	int(10) 		NO 		PRI NULL auto_increment
department_name	varchar(100) 	NO			NULL
over_head_costs	int(50) 		YES			NULL
total_sales		float(50,2)		YES			NULL

Products
Field			Type			Null	Key	Default	Extra
item_id			int(15)			NO		PRI	NULL	auto_increment
product_name	varchar(100)	NO			NULL	
department_name	varchar(100)	NO			NULL	
price			float(15,2)		YES			NULL	
stock_quantity	int(15)			YES			NULL	
product_sales	float(15,2)		YES			NULL	

##Modules
The node applications are
bamazonCustomer.js
bamazonManager.js
bamazonSupervisor.js

The bamazonCustomer.js module is the shopping application. It allows the customer to select an item_id and quantity, and if there is sufficient quantities, it processes the sale--which means calculate the total cost (no tax) and adjust the database down by the sold quantity. 
Customers can shop for 1 item at a time. 
If there are not enough items in stock. The customer's sale is declined. The shopping menu repeats, until the customer answers "N" (or more specifically does not answer Y or y).

The bamazonManager.js module is the managers application. It allows the manager to view the items being offered for sale, including the quantity of items. It also allows the manager to view low stock items (defined as less than 5 in stock), to add items to stock, and to add a new product (but not new department). 

The bamazonSupervisor.js module is the top level supervisors application. It allows the supervisor to view the sales by department, the overhead costs and the gross profits (sales minus overhead). It also allows the supervisor to add a new department, including the overhead costs of that department. 

The menus are driven by the npm module called inquirer, to make it simple to have the customer, manager, and supervisor make selections. 

Link to Video demonstrating these functions: 
https://drive.google.com/open?id=0B6AC74BBROlrVy1GUkRzeXV2Vlk

Link to Database Extract of Bamazon: 
https://drive.google.com/open?id=0B6AC74BBROlreFdxSk5ySEFlcU0

Link to github: 
https://github.com/jldoucette/mySQLHW.git
