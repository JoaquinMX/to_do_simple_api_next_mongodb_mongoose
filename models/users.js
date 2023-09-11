const { isEmail } = require('validator');

const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

// Esquema del usuario
const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, validate: [isEmail, 'Invalid Email']},
    password: {type: String, min: 0, required: true},
});

// Encriptacion de la contraseña
userSchema.pre("save", function (next) {
    const user = this

    if (this.isModified("password") || this.isNew) {
        bcrypt.genSalt(10, function (saltError, salt) {
            if (saltError) {
                return next(saltError)
            } else {
                bcrypt.hash(user.password, salt, function (hashError, hash) {
                    if (hashError) {
                        return next(hashError)
                    }

                    user.password = hash
                    next()
                })
            }
        })
    } else {
        return next()
    }
});

module.exports = new mongoose.model('users', userSchema);