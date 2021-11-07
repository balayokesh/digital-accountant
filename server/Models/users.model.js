const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = new schema(
    {
        name: {
            type: String,
            required: true
        },
        pass: {
            type: String,
            required: true
        },
    }
);

const user = mongoose.model('User', userSchema);
module.exports = user;