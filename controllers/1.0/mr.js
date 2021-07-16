const { database_mr } = require("../../models");
const { Op } = require("sequelize");
const e = require("cors");
class Mr {
  static list(req, res, next) {
    const title = req.query.title;
    var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
    database_mr
      .findAll({ where: condition })
      .then((data) => {
        console.log("data: ", data);
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving MRs.",
        });
      });
  }

  static listById(req, res, next) {
    const id = req.params.id;

    database_mr
      .findByPk(id)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving MR with id=" + id,
        });
      });
  }

  static listLikeById(req, res, next) {
    const id = req.params.id;

    database_mr
      .findAll({
        where: {
          icd_10: {
            [Op.like]: `%${id}%`,
          },
        },
      })
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error retrieving MR with id=" + id,
        });
      });
  }

  static async create(req, res, next) {
    if (!req.body.icd_10) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    // Create a MR
    const MR = {
      icd_10: req.body.icd_10,
      name_en: req.body.name_en,
      name_ind: req.body.name_ind,
    };

    // Save MR in the database
    database_mr
      .create(MR)
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.errors[0].message ||
            "Some error occurred while creating the Medical Record.",
        });
      });
  }

  static async update(req, res, next) {
    const id = req.body.id;

    database_mr
      .update(req.body, {
        where: { icd_10: id },
      })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: `Medical Record with id ${id} was updated successfully.`,
          });
        } else {
          res.send({
            message: `Cannot update Medical Record with id=${id}. Maybe MR was not found or req.body is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating Medical Record with id=" + id,
        });
      });
  }

  static async delete(req, res, next) {
    const id = req.params.id;

    database_mr
      .destroy({
        where: { icd_10: id },
      })
      .then((num) => {
        if (num == 1) {
          res.send({
            message: `Medical Record with id ${id} was deleted successfully!`,
          });
        } else {
          res.send({
            message: `Cannot delete Medical Record with id=${id}. Maybe MR was not found!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Could not delete Medical Record with id=" + id,
        });
      });
  }
}

module.exports = Mr;
