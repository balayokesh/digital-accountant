const router = require('express').Router();

const users = require('../Models/users.model');

router.route('/').get((req, res) => {
    const credentials = {
        "name": req.body.name,
    }
    users.find(credentials)
        .then(
            user => {
                let pass = user[0].pass;
                if (pass === req.body.pass){
                    res.json("Login success");
                }
                else if (pass !== req.body.pass){
                    res.json("Credentials doesn't match!");
                }
            }
        )
        .catch(err => res.status(400).json('Error: '+err))
});

module.exports = router;