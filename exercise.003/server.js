import express from 'express';
const app = express();
const port = process.env.PORT || 5656;
//DB Connection
import mongoose from 'mongoose';
const db = mongoose.connect('mongodb://dp_exercise_03_v01:dp_exercise_03_v01@ds125068.mlab.com:25068/api-test2');

// routes go here
import bookRouter from './Routes/bookRouter';
app.use('/api/Books', bookRouter);

app.listen(port, () => {
    console.log('http://localhost:${port}')
})