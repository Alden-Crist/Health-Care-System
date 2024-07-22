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

app.use('/api/v1/users', userRouter);
app.use('/api/v1/doctors', doctorRouter);
app.use('/api/v1/admins', adminRouter);
app.use('/api/v1/records', recordRouter);
app.use('/api/v1/consultdoctors',consultRouter);

module.exports = app;
