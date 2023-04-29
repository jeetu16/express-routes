const express = require('express');
const app = express();
const {
    getProduct,
    getAllProducts,
    addProduct,
    updateProduct,
    replaceProduct,
    deleteProduct
} = require('./controller/product.controller');



app.use(express.json());

app.use('/user',require('./routes/user.routes'));

// sending all products to the user using get method
app.get('/products', getAllProducts )
// sending specified product to the user using get method 
app.get('/products/:id', getProduct)
// adding new product to the db using post method
app.post('/products', addProduct)
// updating product by replacing the entire product details with users data using put method
app.put('/products/:id', replaceProduct )
// updating only some property of given product id using patch method 
app.patch('/products/:id', updateProduct)
// deleting product by given product id using delete method
app.delete('/products/:id', deleteProduct)


// app.get('/users', getAllUsers)
// app.get('/users/:id', getUser)
// app.post('/users', addUser)
// app.put('/users/:id', replaceUser)
// app.patch('/users/:id', updateUser)
// app.delete('/users/:id', deleteUser)



app.listen(4000, () => {
    console.log("Server is running on port 4000");
})