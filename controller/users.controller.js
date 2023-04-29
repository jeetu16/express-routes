const fsPromises = require('fs').promises;
const path = require('path');




const getAllUsers = async (req, res) => {

    const users = JSON.parse(await fsPromises.readFile(path.join(__dirname, "..", "Data", 'users.json'), 'utf8'));
    res.status(200).json(users);
}


const getUser = async (req, res) => {

    const users = JSON.parse(await fsPromises.readFile(path.join(__dirname, "..", "Data", 'users.json'), 'utf8'));
    const found = users.find((user) => user.id === +req.params.id);
    if (!found) {
        res.status(404).json({ "message": `Not found user with id ${req.params.id}` });
    }
    res.status(200).json(found);
}

const addUser = async (req, res) => {

    let users = JSON.parse(await fsPromises.readFile(path.join(__dirname, "..", "Data", 'users.json'), 'utf8'));
    users = [...users, { "id": users.length + 1, ...req.body }]
    console.log(req.body)
    await fsPromises.writeFile(path.join(__dirname, "..", 'data', 'users.json'), JSON.stringify(users));
    res.status(201).json({ "message": "successfull added" })
}

const replaceUser = async (req, res) => {

    const id = +req.params.id;
    let users = JSON.parse(await fsPromises.readFile(path.join(__dirname, "..", "Data", 'users.json'), 'utf8'));

    const foundIndex = users.findIndex((user) => user.id === id);
    if (foundIndex === -1) {
        return res.status(404).json({ "message": "Not found data" });
    }

    users.splice(foundIndex, 1, { "id": id, ...req.body })
    await fsPromises.writeFile(path.join(__dirname, "..", "Data", "users.json"), JSON.stringify(users));
    res.status(200).json({ "message": "succussfully Updated Data", "data": { ...req.body } })

}


const updateUser = async (req, res) => {

    const id = +req.params.id;
    let users = JSON.parse(await fsPromises.readFile(path.join(__dirname, "..", "Data", 'users.json'), 'utf8'));

    const foundIndex = users.findIndex((user) => user.id === id);
    if (foundIndex === -1) {
        return res.status(404).json({ "message": "Not found data" });
    }
    const data = users[foundIndex];

    users.splice(foundIndex, 1, { ...data, ...req.body })
    await fsPromises.writeFile(path.join(__dirname, "..", "Data", "users.json"), JSON.stringify(users));
    res.status(200).json({ "message": "succussfully Updated Data", "data": { ...req.body } })
}

const deleteUser = async (req, res) => {

    const id = +req.params.id;
    const users = JSON.parse(await fsPromises.readFile(path.join(__dirname, "..", "Data", "users.json"), 'utf8'));

    const found = users.find((user) => user.id === id);
    if (!found) {
        return res.status(404).json({ "message": `Not found any user with given id ${id}` })
    }

    const afterDelete = users.filter((user) => user.id !== id);
    await fsPromises.writeFile(path.join(__dirname, "..", "Data", "users.json"), JSON.stringify(afterDelete));
    res.status(200).json({ "message": `Successfully deleted user with given id ${id}`, "user": { ...found } })
}


module.exports = {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    replaceUser,
    addUser
}