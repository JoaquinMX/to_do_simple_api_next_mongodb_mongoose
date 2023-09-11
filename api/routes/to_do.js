const express = require('express');
const router = express.Router();

const { requireLogin } = require('../middlewares/authentication');
//const { uploadMiddleware } = require('../middlewares/upload');

const toDoController = require('../controllers/to_do');

router.use(requireLogin);

//Create a ToDo
router.post("/", requireLogin, toDoController.createToDo);

//Read One ToDo by id
router.get('/Get/:toDoId', toDoController.getToDoById)

//Read ToDos by email
router.get('/byEmail/:email', toDoController.getToDosByEmail);

// Read all ToDos
router.get('/', toDoController.getAllToDos);

// Update a ToDo
router.put('/:toDoId', toDoController.updateToDo);

// Delete a ToDo
router.delete('/:toDoId', toDoController.deleteToDo);

module.exports = router;