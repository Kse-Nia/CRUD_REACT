require("dotenv").config();
const bcrypt = require("bcrypt");
const { text } = require("express");
const jwt = require("jsonwebtoken");
secretToken = process.env.TOKEN_SECRET;
const db = require("../models");
const User = db.User;
const Comment = db.Comment;

// Créer un nouveau commentaire
exports.createComment = async (req, res) => {
  const text = req.body.text;
  const UserId = req.params.UserId;
  const PostId = req.params.PostId;
  const firstName = req.params.firstName;
  const lastName = req.params.lastName;

  if (!req.body) return res.status(403).send("Veillez saisir un texte");

  console.log(text);
  console.log(UserId);
  console.log(firstName);
  console.log(lastName);

  const comment = new Comment({
    text: text,
    UserId: UserId,
    PostId: PostId,
    firstName: firstName,
    lastName: lastName,
  });
  comment
    .save()
    .then(() => res.status(201).json({ message: "Commentaire posté" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllComments = async (req, res) => {
  const { PostId } = req.params;

  Comment.findAll({
    where: {
      PostId: PostId,
    },
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName", "imageUrl"],
      },
    ],
    order: [["createdAt", "ASC"]],
  })
    .then((comment) => {
      res.status(200).send(comment);
    })
    .catch((err) =>
      res.status(500).send({
        err,
      })
    );
};

exports.getOneComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => {
      console.log(comment);
      res.status(200).json(comment);
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.deleteComment = (req, res, next) => {
  Comment.findOne({ where: { id: req.params.id } })
    .then((comment) => {
      Comment.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Commentaire supprimé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
