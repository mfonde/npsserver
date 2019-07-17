const express = require('express');
const app = express();
require('dotenv').config();
const sequelize = require('./db');
const bodyParser = require('body-parser');
sequelize.sync();
app.use(bodyParser.json());

const user = require('./controllers/usercontroller');
const post = require('./controllers/postcontroller');
const listItem = require('./controllers/bucketlistcontroller');

app.use(require('./middleware/headers'));
app.use('/user', user);
app.use('/post', post);
app.use('/bucketlist', listItem);

app.listen(3000, function() {
console.log('NPS app is listening on 3000.')
})
// app.use('/api/test', function(req, res) {
//     res.send('Server is working.')
// })
