const express = require("express");
const jobRoutes = require("./route/job");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb+srv://priyankabaraiyya5:UJYB273Yep8dLk1G@cluster0.w9gvrhd.mongodb.net/")
.then(() => console.log("DB Connected successfully"))
.catch((err) => console.log("Error connecting database", err));

app.use(express.json());

app.use(jobRoutes);

app.listen(10000, () => console.log(`Server is up and running at port 10000`));