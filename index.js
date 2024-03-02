const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const authRouter = require('./controllers/auth.js');

const tourController=require('./controllers/tour.js')

const contactUs=require('./controllers/contactUs.js')
const cors = require('cors');
const port = process.env.PORT || 4000;
const uri = "mongodb+srv://rawat009111:fSQGtHMkkia3YhjZ@tours.qpddv9d.mongodb.net/?retryWrites=true&w=majority";
const mongoose = require('mongoose');
mongoose.connect(uri, { });
const db = mongoose.connection;

db.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});
app.use(cors());


app.use(bodyParser.json());

app.post('/user/signup', authRouter.signup);
app.post('/user/login', authRouter.login);
app.post('/expert/signup', authRouter.signup);
app.post('/expert/login', authRouter.login);
app.post('/api/createTours', tourController.createTour);
app.post('/api/contactus', contactUs.submitContactForm);
app.get('/api/allTours', tourController.getAllTours);
app.post('/api/vendorTours', tourController.getToursForVendor);
app.put('/api/updateTour/:tourId', tourController.updateTour);
app.get('/api/getTour/:tourId', tourController.getTourDetails);
app.get('/', (req, res) => { 
  res.send('Hello, Express with MongoDB!');
});

app.listen(port, '127.0.0.1', () => {
  console.log(`Server is running on port ${port}`);
});