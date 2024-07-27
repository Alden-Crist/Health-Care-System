const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config({ path: "././config.env" });

const app = require("./app");

//LOCAL DATABASE CONNECTION
mongoose.connect(process.env.DATABASE_LOCAL).then(() =>
  console.log("DB connection successfull !!(localhost)")
);


// const DB = process.env.DATABASE.replace(
//   '<PASSWORD>',
//   process.env.DATABASE_PASSWORD
// );

// //Atlas DATABASE CONNECTION
// mongoose.connect(DB).then(() =>
//   console.log('DB connection successfull(Atlas)')
// );


const port = process.env.PORT  || 8000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});



