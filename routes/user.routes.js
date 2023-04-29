const express = require('express');
const router = express.Router();

const {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser,
    replaceUser,
    addUser
} = require('../controller/users.controller');

router.route('/')
    .get(getAllUsers)
    .post(addUser)
    
router.route('/:id')    
    .put(replaceUser)
    .patch(updateUser)
    .delete(deleteUser)
    .get(getUser)


module.exports = router;

