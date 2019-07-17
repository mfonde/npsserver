const router = require('express').Router();
const Post = require('../db').import('../models/postmodel');
const validateSession = require('../middleware/validate-session');

router.post('/', validateSession, (req, res) => {
    Post.create({
       park: req.body.post.park,
       state: req.body.post.state,
       activity: req.body.post.activity,
       comments: req.body.post.comments, 
       owner: req.user.id
    })
    .then (post => res.status(200).json(post))
    .catch(err => res.status(500).json(req.errors))
})

router.get('/getall', (req, res) => {
    Post.findAll()
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({error: err}))
})

router.get('/myposts', validateSession, (req, res) => {
    Post.findAll({where: {owner: req.user.id}})
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({error: err}))
})

router.get('/parkname/:park', validateSession, (req, res) => {
    Post.findAll({where: {park: req.params.park}})
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({error: err}))
})

router.get('/state/:state', validateSession, (req, res) => {
    Post.findAll({where: {state: req.params.state}})
    .then(post => res.status(200).json(post))
    .catch(err => res.status(500).json({error: err}))
})

router.put('/update/:id', validateSession, (req, res) => {
    Post.update(req.body.post, {where: {id: req.params.id, owner: req.user.id}})
    .then(post => res.status(200).json(post))
    .catch(err => res.json({error: err}))
})

router.delete('/delete/:id', validateSession, (req, res) => {
    Post.destroy({where: {id: req.params.id, owner: req.user.id}})
    .then(post => res.status(200).send('Post Deleted'))
    .catch(err => res.status(500).json({error: err}))
})


module.exports = router;