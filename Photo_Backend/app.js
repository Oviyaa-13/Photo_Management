const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const userRoutes=require("./routes/userRoutes");
const photoRoutes = require('./routes/photoRoutes');
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect('mongodb+srv://oviyaa:Oviyaa_0903@cluster0.wo10wno.mongodb.net/PHOTOS')
.then(() => {
  console.log("MongoDB connected");
})
.catch(err => {
  console.error("Error connecting to MongoDB", err);
});

app.set("view engine",'ejs');
app.use('/', userRoutes);
app.use('/photos', photoRoutes);

app.listen(7000, () => {
  console.log("Server is running on port 7000");
});
