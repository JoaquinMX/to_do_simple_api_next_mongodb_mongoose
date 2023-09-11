const mongoose = require('mongoose');
const UserModel = require('../models/users');
const bcrypt = require("bcryptjs");

// Servicio para el login, verifica la constraseña ingresada por el usuario
const login = async (email, password) => {
    
    let user = await UserModel.findOne({ email: email });
    if (user) {
        let success = bcrypt.compareSync(password, user.password);
        if (success === true)
            return user;
        else
            return null;
    }
    return null;
};

const createUser = async (name, email, password) => {
    const user = new UserModel({ name: name, email: email, password: password});

    // All validation, checks, further tasks (sending emails, etc.) must happen here.
    const newUser = await user.save();
    return newUser;
};

const getUserByEmail = async (email) => {
    const user = await UserModel.findOne({ email: email });
    return user;
};

const getUserById = async (id) => {
    const user = await UserModel.findById(id);
    return user;
};

const getUsers = async () => {
    const users = await UserModel.find();
    return users;
};

module.exports = {
    login,
    createUser,
    getUserByEmail,
    getUserById,
    getUsers
};
