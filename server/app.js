const express = require("express");
const morgan = require("morgan");
const cors =require('cors');
const bodyParser =require('body-parser')
const userRouter = require('./routes/userRoutes');
const doctorRouter = require('./routes/doctorRoutes');
const adminRouter =require('./routes/adminRoutes');
const recordRouter =require('./routes/recordRoutes');
const consultRouter =require('./routes/consultdoctorRoutes')

const app = express();
app.use(bodyParser.json());

app.use(cors());

app.use(express.json());


app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use(morgan("dev"));

app.use('/users', userRouter);
app.use('/doctors', doctorRouter);
app.use('/admins', adminRouter);
app.use('/records', recordRouter);
app.use('/consultdoctors',consultRouter);

module.exports = app;
