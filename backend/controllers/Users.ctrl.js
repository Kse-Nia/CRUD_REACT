require("dotenv").config();
secretTokenKey = process.env.TOKEN_SECRET;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const db = require("../models");
const User = db.User;

const getTokenUserId = (req) => {
  const token = req.headers.authorization.split(" ");
  const decodedToken = jwt.verify(token[1], secretTokenKey);
  const decodedId = decodedToken.userId;
  return decodedId;
};

let admin = false;
const checkAdmin = (decodedId) => {
  User.findOne({
    where: {
      id: decodedId,
    },
  }).then((user) => (admin = user.isAdmin));
  return admin;
};

exports.getAllUsers = (req, res) => {
  User.findAll({
    order: [["firstName", "ASC"]],
  })
    .then((users) => {
      let result = [];
      for (i in users) {
        let firstName = users[i].firstName;
        let lastName = users[i].lastName;
        let email = users[i].email;
        let imageUrl = users[i].imageUrl;
        result.push({
          firstName,
          lastName,
          email,
          imageUrl,
        });
      }
      res.status(200).json(result);
    })
    .catch((error) =>
      res.status(500).send({
        error,
      })
    );
};

exports.getOneUser = async (req, res) => {
  const decodedId = getTokenUserId(req);

  try {
    const user = await User.findOne({
      where: {
        id: decodedId,
      },
    });
    console.log(user);
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err: "Une erreur est survenue",
    });
  }
};

exports.deleteOneUser = (req, res) => {
  const decodedId = getTokenUserId(req);

  User.findOne({
    where: {
      id: decodedId,
    },
  })
    .then((user) => {
      if (checkAdmin(decodedId)) {
        const filename = user.photo.split("/images/")[1];
        if (!filename === "defaultPicture.png") {
          fs.unlink(`./uploads/${filename}`, () => {});
        }
        User.destroy({
          where: {
            id: user.id,
          },
        })
          .then(() => res.status(200).send("Compte supprimé"))
          .catch((error) =>
            res.status(500).send({
              error,
            })
          );
      } else {
        res.status(403).send("Erreur");
      }
    })
    .catch((error) =>
      res.status(500).send({
        error,
      })
    );
};

exports.updateProfile = (req, res) => {
  if (!req.file && !req.body.firstName && !req.body.lastName)
    return res.status(403).send("Veillez remplir tous les champs");

  const decodedId = getTokenUserId(req);

  bcrypt.hash(req.body.password, 10, (err, hash) => {
    User.findOne({
      where: {
        id: decodedId,
      },
    })
      .then((user) => {
        let newUser = {
          ...req.body,
        };
        if (req.file) {
          const oldFilename = user.imageUrl.split("/images/")[1];
          if (oldFilename !== "defaultPicture.png") {
            fs.unlink(`./images/${oldFilename}`, () => {});
          }
          newUser = {
            ...newUser,
            imageUrl: `${req.protocol}://${req.get("host")}/images/${
              req.file.filename
            }`,
          };
        }
        return newUser;
      })
      .then((newUser) => {
        return User.update(
          {
            ...newUser,
          },
          {
            where: {
              id: decodedId,
            },
          }
        ).catch((error) =>
          res.status(500).send({
            error,
          })
        );
      })
      .then(() => {
        return User.findOne({
          where: {
            id: decodedId,
          },
        });
      })
      .then((user) => {
        res.status(200).send({
          user: user.id,
          token: jwt.sign(
            {
              userId: user.id,
            },
            secretTokenKey,
            {
              expiresIn: "24h",
            }
          ),
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          imageUrl: user.imageUrl,
          isAdmin: user.isAdmin,
          isAuthenticated: true,
        });
      })
      .catch((error) =>
        res.status(500).send({
          error,
        })
      );
  });
};

exports.modifyPassword = (req, res) => {
  if (!req.body.oldPassword || !req.body.password || !req.body.passwordConfirm)
    return res.status(403).send("Tous les champs sont requis.");

  const decodedId = getTokenUserId(req);

  User.findOne({
    where: {
      id: decodedId,
    },
  })
    .then((user) => {
      if (!user) return res.status(403).send("Compte introuvable");
      bcrypt
        .compare(req.body.oldPassword, user.password)
        .then((valid) => {
          if (!valid) return res.status(403).send("Mauvais mot de passe");
          bcrypt.hash(req.body.passwordConfirm, 10, (err, hash) => {
            User.update(
              {
                password: hash,
              },
              {
                where: {
                  id: decodedId,
                },
              }
            )
              .then(() => {
                return res.status(200).send("Mot de passe modifié");
              })
              .catch(() => res.status(500).send("Modification impossible"));
          });
        })
        .catch(() => res.status(500).send("Erreur"));
    })
    .catch((error) => res.status(500).send(error));
};
