const router = require('express').Router();

const users = require('../Models/users.model');

router.route('/').get((req, res) => {
    users.find()
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: '+err))
});

module.exports = router;