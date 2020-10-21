require('./models/User');

const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const bodyParser = require('body-parser');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);

const mongoUri = 'mongodb+srv://admin:passwordpassword@track.3etla.mongodb.net/<dbname>?retryWrites=true&w=majority'

mongoose.connect( mongoUri , {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.on( 'connected' , () => console.log('Connected to mongo instance'));

mongoose.connection.on( 'error' , (err) => console.log(err));

app.get('/auth' , requireAuth , (req , res) => {
    res.send(`Email: ${req.user.email}`);
});

app.get('/' , (req , res) => {
    res.send('Hi there!');
});

app.listen( 3000 , () => {
    console.log('Litsening on port 3000');
});