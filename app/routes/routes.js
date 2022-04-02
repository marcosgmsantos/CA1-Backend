module.exports = app => {
  const controller = require("../controllers/controller.js");

  var router = require("express").Router();

  // Create a new entry
  router.post("/", controller.create);

  // Retrieve all entry
  router.get("/", controller.findAll);

  // Retrieve a single entry with id
  router.get("/:id", controller.findOne);

  // Update a entry with id
  router.put("/:id", controller.update);

  // Delete a entry with id
  router.delete("/:id", controller.delete);

  // Create a new entry
  router.delete("/", controller.deleteAll);

  app.use("/api/entries", router);
};
