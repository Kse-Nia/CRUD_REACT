require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
secretToken = process.env.TOKEN_SECRET;
const db = require('../models');

exports.register = async (req, res) => {
    try {
        if (!req.body.firstName && !req.body.lastName && !req.body.email && !req.body.password && !req.body.controlPassword) {
            return res.status(403).send("Veillez remplir tous les champs")
        }
        let imageUrl = `${req.protocol}://${req.get("host")}/images/defaultPicture.png`;

        const hash = await bcrypt.hash(req.body.password, 10);
        const newUser = await db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            imageUrl: imageUrl,
        })
        res.status(201).send({
            user: newUser,
            token: token,
        });
    } catch (error) {
        return res.status(400).send({
            error: "Impossible de créer le compte"
        });
    }
}

exports.login = (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    if (!email || !password) {
        throw 'Veillez remplir tous les champs';
    }

    db.User.findOne({
            where: {
                email: req.body.email
            }
        })
        .then((user) => {
            if (!user) return res.status(403).send("Compte introuvable")
            // Compare hash
            bcrypt.compare(req.body.password, user.password).then((valid) => {
                if (!valid) return res.status(403).send("Mauvais mot de passe")
                res.status(200).send({
                    // id: user.id,
                    userId: user.id,
                    token: jwt.sign({
                            userId: user.id
                        },
                        secretToken, {
                            expiresIn: '24h'
                        }
                    ),
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    imageUrl: user.imageUrl,
                    isAdmin: user.isAdmin,
                    isAuthenticated: true,
                })
            })
        })
        .catch((error) => res.status(500).send({
            error
        }))
}