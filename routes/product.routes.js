const express = require('express');
const router = express.Router();

const {
    getProduct,
    getAllProducts,
    addProduct,
    updateProduct,
    replaceProduct,
    deleteProduct
} = require('../controller/product.controller');



router.route('/')
    .get(getAllProducts)
    .post(addProduct)


router.route('/:id')
    .get(getProduct)
    .put(replaceProduct)
    .patch(updateProduct)
    .delete(deleteProduct)


module.exports = router;