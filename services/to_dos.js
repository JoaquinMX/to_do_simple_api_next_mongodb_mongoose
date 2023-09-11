var appRoot = require('app-root-path');
const { toDosPhotoFolder } = require('../config');
const fs = require('fs');
const path = require('path');
const ToDoModel = require('../models/to_dos');

const createToDo = async (description, completed, created_at, updated_at , email) => {
    const toDo = new ToDoModel({ description, completed, created_at, updated_at , email });
    const newToDo = await toDo.save();
    return newToDo;
}

const getToDoById = async (toDoId) => {
    const toDo = await ToDoModel.findOne({ _id: toDoId });
    return toDo;
}

const getToDosByEmail = async (toDoEmail) => {
    const toDo = await ToDoModel.find({ email: toDoEmail });
    return toDo;
}

const getAllToDos = async () => {
    const toDos = await ToDoModel.find();
    return toDos;
}

const updateToDo = async (toDoId, description, completed, updated_at , email) => {
    const toDo = await ToDoModel.findOne({ _id: toDoId });
    console.log(`${toDo}, description: ${description}`);
    toDo.description = description;
    toDo.completed = completed;
    toDo.updated_at = updated_at;
    toDo.email = email;
    await toDo.save();
    return toDo;
}

const deleteToDo = async (toDoId) => {
    let toDo = await ToDoModel.findOneAndDelete({ _id: toDoId });
    return toDo;
}

module.exports = {
    createToDo,
    getToDoById,
    getToDosByEmail,
    getAllToDos,
    updateToDo,
    deleteToDo
};