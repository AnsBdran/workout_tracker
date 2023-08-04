require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const workoutRoutes = require('./routes/workout');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => {
    app.listen(process.env.PORT, () => {
      console.log(
        `we've successfully connected to Database, and listening on port: ${process.env.PORT}`
      );
    });
  })
  .catch((error) => {
    console.log('there is something got wrong', error);
  });

app.use('/workout', workoutRoutes);
