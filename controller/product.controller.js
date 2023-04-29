const fsPromises = require('fs').promises;
const path = require('path');




const getAllProducts = async (req, res) => {

    const products = JSON.parse(await fsPromises.readFile(path.join(__dirname, "..", "Data", 'products.json'), 'utf8'));
    res.status(200).json(products);
}


const getProduct = async (req, res) => {

    const products = JSON.parse(await fsPromises.readFile(path.join(__dirname, "..", "Data", 'products.json'), 'utf8'));
    const found = products.find((product) => product.id === +req.params.id);
    if (!found) {
        res.status(404).json({ "message": `Not found product with id ${req.params.id}` });
    }
    res.status(200).json(found);
}

const addProduct = async (req, res) => {

    let products = JSON.parse(await fsPromises.readFile(path.join(__dirname, "..", "Data", 'products.json'), 'utf8'));
    products = [...products, { "id": products.length + 1, ...req.body }]
    console.log(req.body)
    await fsPromises.writeFile(path.join(__dirname, "..", 'data', 'products.json'), JSON.stringify(products));
    res.status(201).json({ "message": "successfull added" })
}

const replaceProduct = async (req, res) => {

    const id = +req.params.id;
    let products = JSON.parse(await fsPromises.readFile(path.join(__dirname, "..", "Data", 'products.json'), 'utf8'));

    const foundIndex = products.findIndex((product) => product.id === id);
    if (foundIndex === -1) {
        return res.status(404).json({ "message": "Not found data" });
    }

    products.splice(foundIndex, 1, { "id": id, ...req.body })
    await fsPromises.writeFile(path.join(__dirname,"..", "Data", "products.json"), JSON.stringify(products));
    res.status(200).json({ "message": "succussfully Updated Data", "data": { ...req.body } })

}


const updateProduct = async (req, res) => {

    const id = +req.params.id;
    let products = JSON.parse(await fsPromises.readFile(path.join(__dirname, "..", "Data", 'products.json'), 'utf8'));

    const foundIndex = products.findIndex((product) => product.id === id);
    if (foundIndex === -1) {
        return res.status(404).json({ "message": "Not found data" });
    }
    const data = products[foundIndex];

    products.splice(foundIndex, 1, { ...data, ...req.body })
    await fsPromises.writeFile(path.join(__dirname, "..", "Data", "products.json"), JSON.stringify(products));
    res.status(200).json({ "message": "succussfully Updated Data", "data": { ...req.body } })
}

const deleteProduct = async (req, res) => {

    const id = +req.params.id;
    const products = JSON.parse(await fsPromises.readFile(path.join(__dirname, "..", "Data", "products.json"), 'utf8'));

    const found = products.find((product) => product.id === id);
    if (!found) {
        return res.status(404).json({ "message": `Not found any product with given id ${id}` })
    }

    const afterDelete = products.filter((product) => product.id !== id);
    await fsPromises.writeFile(path.join(__dirname, "..", "Data", "products.json"), JSON.stringify(afterDelete));
    res.status(200).json({ "message": `Successfully deleted product with given id ${id}`, "product": { ...found } })
}


module.exports = { 
    getAllProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    replaceProduct,
    addProduct
}