const toDoService = require('../../services/to_dos');

module.exports = {
    createToDo: async (req, res, next) => {
        //let { description, completed, created_at, updated_at , email } = JSON.parse(req.body.toDo);
        console.log(req.body.toDo);
        
        let { description, completed, created_at, updated_at , email } = req.body.toDo;

        try {
            const toDo = await toDoService.createToDo(description, completed, created_at, updated_at , email)
            res.status(201).json(toDo);
        } catch (err) {
            res.status(500).json({"Message":`error: ${err.message}`});
            console.log(err.message);
        }
    },

    getToDoById: async (req, res, next) => {
        let toDoId = req.params.toDoId;
    
        try {
            const toDo = await toDoService.getToDoById(toDoId);
            if (toDo) {
                res.status(201).json(toDo);
            } else {
                res.status(404).json({"message": "NotFound"});
            }
        } catch (err) {
            res.status(500).json({"message": `Request for id ${toDoId} caused an error`});
            console.log(err.message);
        }
    },

    getToDosByEmail: async (req, res, next) => {
        let toDoEmail = req.params.email;
    
        try {
            let toDo = await toDoService.getToDosByEmail(toDoEmail);
            res.json(toDo);
        } catch (err) {
            res.status(503).end(`Request for email ${toDoEmail} caused an error`);
            console.log(err.message);
        }
    },

    getAllToDos: async (req, res, next) => {
        try {
            const toDos = await toDoService.getAllToDos();
            res.json(toDos);
        } catch {
            res.status(500).end(`Request for all toDos caused an error`);
            console.log(err.message);
        }
    },

    updateToDo: async (req, res, next) => {
        let toDoId = req.params.toDoId;
        let { description, completed, updated_at , email } = req.body.toDo;
        console.log(req.body.toDo);

        try {
            const toDo = await toDoService.getToDoById(toDoId);
            if (toDo) {

                const updatedToDo = await toDoService.updateToDo(toDoId, description, completed, updated_at , email)
                res.json(updatedToDo);
            } else {
                res.status(404).json({"message": `toDo with id ${toDoId} does not exist`});
                console.log(`toDo with id ${toDoId} does not exist`);
            } 
        } catch (err) {
            res.status(500).end(`Request for updating toDoId ${toDoId} caused an error ${err.message}`)
        }
    },

    deleteToDo: async (req, res, next) => {
        const toDoId = req.params.toDoId;
        try {
            const toDo = await toDoService.deleteToDo(toDoId);
            res.json(toDo);
        } catch (err) {
            res.status(500).json({"message": `Request for deleting toDoId ${toDoId} caused an error`});
            console.log(err.message);
        }
    },
};
