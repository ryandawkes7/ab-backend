const express = require('express');
const router = express.Router();
const UserAccount = require('../models/userAccount');

// Routes
router.get('/', (req, res) => {

    UserAccount.find({})
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('Error: ', error)
        });

});

// Receive data from frontend
router.post('/save', (req, res) => {
    const data = req.body;
    const newUserAccount = new UserAccount(data)

    newUserAccount.save((error) => {
        if(error) {
            res.status(500).json({
                msg: 'Internal Server Error, sorry'
            })
            return;
        }

        return res.json({
            msg: 'Your data has been saved in the server'
        });

    })
});

router.get('/name', (req, res) => {
    const data = {
        username: 'peter',
        age: 14
    }
    res.json(data);
});

module.exports = router;
