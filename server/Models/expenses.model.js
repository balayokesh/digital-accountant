const mongoose = require('mongoose');
const schema = mongoose.Schema;

const expenseSchema = new schema(
    {
        user_id: {
            type: String,
            required: true,
        },
        amt: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: false,
        },
        time: {
            type: Date,
            required: true,
        },
        notes: {
            type: String,
            required: false,
        },
    }
);

const expense = mongoose.model('Expense', expenseSchema);
module.exports = expense;