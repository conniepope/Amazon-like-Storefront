# Amazon-like-Storefront
This app represents an online store like Amazon. It has 3 different Node Apps: bamazonCustomer, bamazonManager, and bamazonSupervisor.

## Customer Experience
In the Customer Experience (bamazonCustomer), a list of products that are available for purchase is displayed.

![image](https://user-images.githubusercontent.com/47279070/61420260-a4515100-a8cf-11e9-9306-d889612189be.png)

The customer chooses what quantity they want and the item and the total price are then displayed. They will then confirm the purchase.

![image](https://user-images.githubusercontent.com/47279070/61420267-b16e4000-a8cf-11e9-81d5-3c71ff00d1f0.png)

If they choose not to confirm the purchase, they are either referred back to the original list or an ending greeting is displayed.

![image](https://user-images.githubusercontent.com/47279070/61420274-b8954e00-a8cf-11e9-9c2d-c613637645fc.png)

## Manager Experience
In the Manager Experience (bamazonManager), a menu of options is displayed.

![image](https://user-images.githubusercontent.com/47279070/61420281-bfbc5c00-a8cf-11e9-99e4-dca7630e732d.png)

If View Products for Sale is selected, a table with all available products is displayed.

![image](https://user-images.githubusercontent.com/47279070/61420291-c6e36a00-a8cf-11e9-9754-3d7e3ef41bf0.png)

If View Low Inventory is selected, a table with all products with less than 5 items is displayed.

![image](https://user-images.githubusercontent.com/47279070/61420302-d5ca1c80-a8cf-11e9-9e57-39d079087898.png)

If Add to Inventory is selected, a listing of products is displayed. Once a product is selected, the manager can enter in the number of items to add into product inventory. The total in stock is then displayed.

![image](https://user-images.githubusercontent.com/47279070/61420316-e24e7500-a8cf-11e9-8cac-cbb0220cdf4b.png)

If Add New Product is selected, the manager will be asked what the new product is, what department the item goes into, the listing price of the item, and the starting quantity.

![image](https://user-images.githubusercontent.com/47279070/61420323-e8dcec80-a8cf-11e9-8e8e-2678e2952331.png)

## Supervisor Experience
In the Supervisor Experience (bamazonSupervisor), a menu of option is displayed.

![image](https://user-images.githubusercontent.com/47279070/61420335-f09c9100-a8cf-11e9-8354-a224510f753b.png)

If View Product Sales by Department is selected, a table listing each department with its over head costs, product sales, and total profit is displayed.

![image](https://user-images.githubusercontent.com/47279070/61420340-f72b0880-a8cf-11e9-8afe-5211ef0174ef.png)

If Create New Department is selected, the supervisor will be asked what department they would like to add and the overhead cos for this department.

![image](https://user-images.githubusercontent.com/47279070/61420351-fd20e980-a8cf-11e9-905b-4a7c7533db74.png)


### Technologies used: MySQL, Node.js, Javascript, and inquirer npm package.
