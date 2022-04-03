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

// Update a Entry by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Entry.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Entry with id=${id}. Maybe Entry was not found!`
        });
      } else res.send({ message: "Entry was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Entry with id=" + id
      });
    });
};


// Delete a Entry with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Entry.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Entry with id=${id}. Maybe Entry was not found!`
        });
      } else {
        res.send({
          message: "Entry was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Entry with id=" + id
      });
    });
};

// Delete all Entrys from the database.
exports.deleteAll = (req, res) => {
  Entry.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Entrys were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Entrys."
      });
    });
};

// Find all published Entrys
exports.findAllPublished = (req, res) => {
  Entry.find({ published: true })
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

