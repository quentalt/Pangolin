const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const connectDb = require('./db');

const pangolinRoutes = require('./controllers/pangolin.controller.js');
const userRoutes = require('./controllers/user.controller.js');
const {errorHandler} = require('./middlewares');

const app = express();

app.use(bodyParser.json());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:4200'
}));
app.use('/api', pangolinRoutes);
app.use('/api/auth', userRoutes);
app.use(errorHandler);



const port = 3000;

connectDb().then(async () => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}
).catch(err => console.log(err));
