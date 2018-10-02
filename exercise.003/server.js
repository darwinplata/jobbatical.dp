//declarations
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const bookRouter = require("./Routes/bookRouter");

const app = express();
const port = process.env.PORT || 5656;

//db connection
const db = mongoose.connect('mongodb://dp_exercise_03_v01:dp_exercise_03_v01@ds121373.mlab.com:21373/dp_exercise_03_v01');

//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes go here
app.use('/api/Books', bookRouter);

app.listen(port, () => {
    console.log('http://localhost:${port}')
})