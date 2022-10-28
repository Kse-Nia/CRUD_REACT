require("dotenv").config();
const bcrypt = require("bcrypt");
const { text } = require("express");
const jwt = require("jsonwebtoken");
secretToken = process.env.TOKEN_SECRET;
const db = require("../models");
const Post = db.Post;
const User = db.User;
const Comment = db.Comment;

// Créer un nouveau Post
exports.createPost = (req, res, next) => {
  const postObject = req.body;
  const UserId = req.body.UserId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  console.log(req.body);
  console.log(UserId);
  console.log(firstName);
  console.log(lastName);

  if (req.file) {
    postObject.imageUrl = `${req.protocol}://${req.get("host")}/images/posts/${
      req.file.filename
    }`;
  }
  const post = new Post({
    ...postObject,
    UserId: UserId,
    firstName: firstName,
    lastName: lastName,
  });
  post
    .save()
    .then(() => res.status(201).json({ message: "Post enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

// Update Post
exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send("ID unknown : " + req.params.id);

  let updatedRecord = {};

  if (req.file) {
    updatedRecord = {
      content: req.body.content,
      picture: `http://localhost:8080/images/${req.file.filename}`,
    };
  } else {
    updatedRecord = {
      content: req.body.content,
    };
  }
  Post.findOne({ id: req.params.id }).then((post) => {
    if (req.file && post.imageUrl) {
      const filename = post.imageUrl.split("/images/")[1];
      fs.unlink(`./images/${filename}`, () => {
        PostModel.updateOne(
          { id: req.params.id },
          {
            $set: updatedRecord,
          },
          {
            new: true,
          },
          (err, docs) => {
            if (!err) res.send(docs);
            else console.log("Error" + err);
          }
        );
      });
    } else {
      Post.updateOne(
        { id: req.params.id },
        {
          $set: updatedRecord,
        },
        {
          new: true,
        },
        (err, docs) => {
          if (!err) res.send(docs);
          else console.log("Error" + err);
        }
      );
    }
  });
};

// Récupération de tous les Posts
exports.getAllPosts = (req, res) => {
  Post.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: User,
        attributes: ["firstName", "lastName", "imageUrl"],
      },
    ],
  })
    .then((posts) => {
      res.status(200).send(posts);
    })
    .catch((error) =>
      res.status(500).send({
        error,
      })
    );
};

// Récupération d'un seul Post selon l'Id
exports.getOnePost = (req, res) => {
  Post.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: User,
        attributes: ["firstName", "lastName", "imageUrl"],
      },
    ],
  })
    .then((post) => {
      res.send(post);
    })
    .catch((error) =>
      res.status(500).send({
        error,
      })
    );
};

// Suppression Post
exports.deletePost = (req, res, next) => {
  Post.findOne({ where: { id: req.params.id } })
    .then((message) => {
      Post.destroy({ where: { id: req.params.id } })
        .then(() => res.status(200).json({ message: "Post supprimé" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
