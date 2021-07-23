// Iteration #1
// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";
const droneModel = require("../models/Drone.model.js")
mongoose
    .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    })
    .then((x) => {
        console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    })
    .catch((err) => {
        console.error("Error connecting to mongo: ", err);
    });

const drones = [{
     name: "Super Drone",
     propellers: 6,
     maxSpeed: 30
    },
    {
        name: "Petit Drone",
        propellers: 4,
        maxSpeed: 15
    },
    {
        name: "Moyen Drone",
        propellers: 4,
        maxSpeed: 20
    }
]

droneModel.insertMany(drones)
.then((data) => console.log("Create success, ", data.length, " inserted"))
.catch(error => console.log(error))

