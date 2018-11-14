const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const keys = require('../config/keys');
const errorHandler = require('../utils/errorhandler');

//async function for login into CRM
module.exports.login = async function (req, res) {
    const candidate = await User.findOne({
        email: req.body.email
    });

    if (candidate) {
        //check user = user created
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            //true = generate token
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {
                expiresIn: 60 * 60
            });

            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            // false
            res.status(401).json({
                message: 'Invalid password. Try again'
            })
        }
    } else {
        //user wasn't created
        res.status(404).json({
            message: 'User with such email didn\'t find'
        })
    }
}

//async function for register into CRM
module.exports.register = async function (req, res) {
    //email password
    const candidate = await User.findOne({
        email: req.body.email
    });
    if (candidate) {
        //user was created early
        res.status(409).json({
            message: 'User ha\'s already been created with such email'
        });
    } else {
        //need to create user
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });
        try {
            await user.save();
            res.status(201).json(user)
        } catch (e) {
            errorHandler(res, e);
        }
    }
}

/**
 * TODO: create Confirmation Email (nodemailer)
 */