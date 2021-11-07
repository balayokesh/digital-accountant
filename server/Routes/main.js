const router = require('express').Router();

const users = require('../Models/users.model');
const expenses = require('../Models/expenses.model');
const incomes = require('../Models/incomes.model');

router.route('/').get((req, res) => {
    const credentials = {
        "_id": req.body._id,
    }
    users.find(credentials)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: '+err))
});

router.route('/addexpense').post((req, res) => {
    const user_id = req.body.user_id,
        amt= req.body.amt,
        title= req.body.title,
        time= req.body.time,
        notes= req.body.notes

    const newData = new expenses({
        user_id, amt, title, time, notes
    })

    newData.save()
        .then(exp => res.json(exp))
        .catch(err => res.status(400).json('Error: '+err))
});

router.route('/addincome').post((req, res) => {
    const user_id = req.body.user_id,
        amt= req.body.amt,
        title= req.body.title,
        time= req.body.time,
        notes= req.body.notes

    const newData = new incomes({
        user_id, amt, title, time, notes
    })

    newData.save()
        .then(income => res.json(income))
        .catch(err => res.status(400).json('Error: '+err))
});

router.route('/getexpense').post((req, res) => {
    const user_id = req.body.user_id;

    expenses.find({"user_id": user_id})
        .then(exp => res.json(exp))
        .catch(err => res.status(400).json('Error: '+err))
});

router.route('/getincome').post((req, res) => {
    const user_id = req.body.user_id;

    incomes.find({"user_id": user_id})
        .then(income => res.json(income))
        .catch(err => res.status(400).json('Error: '+err))
});

module.exports = router;