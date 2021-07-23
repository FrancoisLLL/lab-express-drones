const express = require('express');
const router = express.Router();

// require the Drone model here
const droneModel = require("../models/Drone.model.js")

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  droneModel.find()
    .then((drones) => {
      res.render("drones/list.hbs", {
        drones: drones,
      })
    })
    .catch(error => console.log(error))
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form.hbs")
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  console.log(req.body);
  droneModel.create(req.body)
    .then(() => {
      console.log("Insertion success")
      res.redirect("/drones")
    })
    .catch(error => {
      console.log(error)
      res.redirect("/drones/create")
    })
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  droneModel.findById(req.params.id)
    .then((drone) => res.render("drones/update-form.hbs", {
      drone: drone
    }))
    .catch(error => console.log(error))
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  droneModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    .then(drone => {
      console.log("update success")
      res.redirect("/drones")
    })
    .catch(error => {
      console.log(error);
      res.redirect(`/drones/${req.params.id}/edit`)
    })
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  droneModel.findByIdAndDelete(req.params.id)
  .then(drone => {
    console.log("delete success")
    res.redirect("/drones")
  })
  .catch(error => {
    console.log(error);
    res.redirect(`/drones`)
  })
});

module.exports = router;