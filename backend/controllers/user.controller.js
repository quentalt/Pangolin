const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
const userSchema = require('../models/user.model')
const authorize = require('../middlewares/auth')
const { check, validationResult } = require('express-validator')

// Sign-up
router.post(
    '/register',
    (req, res, next) => {
        const errors = validationResult(req)
        console.log(req.body)

        if (!errors.isEmpty()) {
            return res.status(422).jsonp(errors.array())
        } else {
            bcrypt.hash(req.body.password, 10).then((hash) => {
                const user = new userSchema({
                    fullName: req.body.fullName,
                    email: req.body.email,
                    password: hash,
                })
                user
                    .save()
                    .then((response) => {
                        res.status(201).json({
                            message: 'User successfully created!',
                            result: response,
                        })
                    })
                    .catch((error) => {
                        res.status(500).json({
                            error: error,
                        })
                    })
            })
        }
    },
)

// Sign-in
router.post('/login', (req, res, next) => {
    let getUser
    userSchema
        .findOne({
            email: req.body.email,
        })
        .then((user) => {
            if (!user) {
                return res.status(401).json({
                    message: 'Authentication failed',
                })
            }
            getUser = user
            return bcrypt.compare(req.body.password, user.password)
        })
        .then((response) => {
            if (!response) {
                return res.status(401).json({
                    message: 'Authentication failed',
                })
            }
            let jwtToken = jwt.sign(
                {
                    email: getUser.email,
                    userId: getUser._id,
                },
                'longer-secret-is-better',
                {
                    expiresIn: '1h',
                },
            )
            res.status(200).json({
                token: jwtToken,
                expiresIn: 3600,
                _id: getUser._id,
            })
        })
        .catch((err) => {
            return res.status(401).json({
                message: 'Authentication failed',
            })
        })
})

// Get Users
router.route('/').get((req, res, next) => {
    userSchema.find((error, response)=> {
        if (error) {
            return next(error)
        } else {
            return res.status(200).json(response)
        }
    })
})


// Get Single User
router.route('/user-profile/:id').get(authorize, async (req, res, next) => {
    try {
        const data = await userSchema.findById(req.params.id);
        res.status(200).json({
            msg: data,
        });
    } catch (error) {
        next(error);
    }
});


// Update User
router.route('/update-user/:id').put((req, res, next) => {
    userSchema.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body,
        },
        (error, data) => {
            if (error) {
                return next(error)
            } else {
                res.json(data)
                console.log('User successfully updated!')
            }
        },
    )
})

// Delete User
router.route('/delete-user/:id').delete((req, res, next) => {
    userSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            res.status(200).json({
                msg: data,
            })
        }
    })
})

module.exports = router