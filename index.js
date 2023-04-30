const express = require('express');
const app = express();


app.use(express.json());

app.use('/users',require('./routes/user.routes'));
app.use('/products',require('./routes/product.routes'))

app.listen(4000, () => {
    console.log("Server is running on port 4000");
})