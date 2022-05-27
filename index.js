require("dotenv").config();
const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
app.use(formidable());
app.use(cors());
app.use(morgan("dev"));

mongoose.connect(process.env.MONGODB_URI);

// const homeRoutes = require("./routes/home");
// app.use(homeRoutes);

const signupRoutes = require("./routes/signup");
app.use(signupRoutes);

const loginRoutes = require("./routes/login");
app.use(loginRoutes);

app.all("*", (req, res) => {
  res.status(400).json("Page introuvable");
});

app.listen(4000, () => {
  console.log("Serveur has started");
});

// app.listen(process.env.PORT, ()=>{
//     console.log("Serveur has started");
// })
