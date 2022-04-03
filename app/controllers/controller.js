const db = require("../models");
const Entry = db.Entrys;

// Create and Save a new Entry
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Entry
  const entry = new Entry({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  });

  // Save Entry in the database
  entry
    .save(entry)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Entry."
      });
    });
};


// Retrieve all Entrys from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  Entry.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Entrys."
      });
    });
};

// Find a single Entry with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Entry.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Entry with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Entry with id=" + id });
    });
};
