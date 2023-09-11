const UserService = require('../../services/users');
const { generateToken } = require('../middlewares/authentication');

module.exports = {
    login: async (req, res, next) => {
        const { email, password } = req.body;
    
        try {
            const user = await UserService.login(email, password);
            if (user) {
                
                // Generate an access token and send it to user
                const accessToken = generateToken(user);
                console.log({ token: accessToken });
                res.status(200).json({token: accessToken });
                console.log(`Succesfully logged ${user.name} in`);

            } else {
                res.status(401).send('Invalid credentials');
                console.log(`Invalid credentials ${email}:${password}`);
            }
        } catch (err) {
            res.status(503).end(`Request for user ${user} caused an error`);
            console.log(err.message)
        }
    },

    registerUser: async (req, res, next) => {
        let { name, email, password } = req.body.users;
        if(await UserService.getUserByEmail(email)) {
            res.status(401).send(`El usuario ya se encuntra en uso: ${email}`);
        }
        else {
            
            try {
                const user = await UserService.createUser(name, email, password);
                res.status(201).json(user);
                console.log(`user created ${user}`);
            } catch (err) {
                res.status(503).send(`error: ${err.message}`);
                console.log(err.message);
            }
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const users = await UserService.getUsers();
            res.json(users);
        } catch (err) {
            res.status(503).end(`Request for all users caused an error`);
            console.log(err.message);
        }
    },

    getUserByEmail: async (req, res, next) => {
        console.log("Here")
        let email = req.params.email

        try{
            const user = await UserService.getUserByEmail(email);
            res.json(user);
        } catch(err){
            res.status(503).end(`Request for username caused an error`);
            console.log(err.message);
        }
    },

    getUserByJwt: async (req, res, next) => {
        let myUser = req.user;
        console.log("Here")
        try{
            const user = await UserService.getUserById(myUser.id);
            res.json(user);
        } catch(err){
            res.status(503).end(`Request for username caused an error`);
            console.log(err.message);
        }
    }
};