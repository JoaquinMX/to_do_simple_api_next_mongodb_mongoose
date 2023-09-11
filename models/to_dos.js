const mongoose = require('mongoose');

// Esquema de la incidencia
const incidentsSchema = new mongoose.Schema({
    description: {type: String, required: true},
    completed: {type: Boolean, required: true },
    email: {type: String, required: true },
    created_at: {type: Date, required: true },
    updated_at: {type: Date, required: true },
});

//! 'to_do' is the name of the collection
module.exports = new mongoose.model('to_do', incidentsSchema);