const router = require('express').Router();
const ListItem = require('../db').import('../models/bucketlistmodel');
const validateSession = require('../middleware/validate-session');

router.post('/', validateSession, (req, res) => {
    ListItem.create({
        park: req.body.listItem.park,
        state: req.body.listItem.state,
        activity: req.body.listItem.activity,
        comments: req.body.listItem.comments,
        owner: req.user.id
    }).then(listItem => res.status(200).json(listItem))
    .catch(err => res.status(500).json(req.erros))
})

router.get('/getall', validateSession, (req, res) => {
    ListItem.findAll({where: {owner: req.user.id}})
    .then(listItem => res.status(200).json(listItem))
    .catch(err => res.status(500).json({error: err}))
})

router.delete('/delete/:id', validateSession, (req, res) => {
    ListItem.destroy({where: {id: req.params.id, owner: req.user.id}})
    .then(post => res.status(200).send('Post Deleted'))
    .catch(err => res.status(500).json({error: err}))
})

module.exports = router;