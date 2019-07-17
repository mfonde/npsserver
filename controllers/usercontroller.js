const express = require('express');
const router = express.Router();
const sequelize = require('../db');
const User = sequelize.import('../models/usermodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// router.get('/', function(req, res) {
//     res.send('Test route')
// })

router.post('/create', (req, res) => {
    // const username = req.body.username;
    // const password = req.body.password;

    User.create({
        username: req.body.user.username,
        password: bcrypt.hashSync(req.body.user.password, 10)
    }).then (createSuccess = (user) => {
        let token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
        res.json({
            user: user,
            message: 'New User Created',
            sessionToken: token
        })
    })
})

router.post('/login', (req, res) => {
    User.findOne({where:{username:req.body.user.username}})
    .then(user => {
        if(user){
            bcrypt.compare(req.body.user.password, user.password, (err, matches) => {
                if(matches){
                    let token = jwt.sign({id:user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});
                    res.json({
                        user: user,
                        message: 'Logged In',
                        sessionToken: token
                    })
                }else{
                    res.status(502).send({error: 'Username or Password is Incorrect'})
                }
            })
        }else {res.status(500).send({error: 'Username or Password is Incorrect'})}
    },
    err => res.status(501).send({error: 'failed to process'})
    )
})


module.exports = router;