const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const {Pangolin} = require('../models/pangolin.model');
const {User} = require('../models/user.model');
const {generateCrudMethods} = require('../services');
const {validateDbId,raiseRecordNotFound} = require('../middlewares');
const jwt = require("jsonwebtoken");
const {model} = require("mongoose");
const pangolinCrud = generateCrudMethods(Pangolin);

router.post("/register", async (req, res) => {
   let fullName = req.body.fullName
   let email = req.body.email
    let password= req.body.password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const User = model('User');

    const record = await User.findOne({email: email})

    if(record) {
        return res.status(400).send({
            message: "User already exists"
        });
    } else {
        const pangolin = new User({
            fullName: fullName,
            email: email,
            password: hashedPassword
        })

        const result = await pangolin.save();

        const {_id} = await result.toJSON();


        const token = jwt.sign({_id: _id}, "secret");

        res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        })

        res.send({
            message: "User created successfully",
           })
    }
})

router.post("/login", async (req, res) => {
    const User = model('User');
    const email = req.body.email;
    const password = req.body.password;

    const user = User.find().then((users) => {
        const user = users.find((user) => user.email === email);
        if (!user) {
            return res.status(400).send({
                message: "User not found"
            });
        }
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                return res.status(400).send({
                    message: "Wrong username or password"
                });
            }
            //generate token
            const token = jwt.sign({_id: user._id}, "secret");

            res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            })
        })
        res.send({
            message: "Logged in successfully",
        })
    })
})

router.get('/users', async (req, res) => {
    const User = model('User');
    const users = await User.find();
    res.send(users);
})

router.get('/users/:id', async (req, res) => {
    const User = model('User');
    const user = await User.findById(req.params.id);
    res.send(user);
})



/*
router.get('/user', async (req, res) => {
    try {
        const cookie = req.cookies['jwt'];

        const claims = jwt.verify(cookie, "secret");

        if (!claims) {
            return res.status(401).send({
                message: "unauthenticated"
            });
        }
        const User = model('User');

        const user = await User.find().then((users) => {
            const user = users.find((user) => user._id === claims._id);
            if (!user) {
                return res.status(400).send({
                    message: "User not found"
                });
            }
            res.send({
                user: user
            })
        })
    }
    catch (e) {
        return res.status(401).send({
            message: "unauthenticated"
        });
    }

        let result = await user.save();

        const {password,...data} = await result.toJSON();

        res.send({
            user: data
        })
    })
*/

router.post("/logout", async (req, res) => {
    res.cookie("jwt","",{maxAge:0});
    res.send({
        message:"Logged out successfully"
    })
})


    router.get('/', (req, res, next) => {
        pangolinCrud.getAll()
            .then(data => res.send(data))
            .catch(err => console.log(err));
    });

    router.get('/:id', validateDbId, (req, res, next) => {
        pangolinCrud.getById(req.params.id)
            .then(data => {
                if (data)
                    res.send(data)
                else
                    raiseRecordNotFound(req, res)
            })
            .catch(err => console.log(err));
    });

    router.post('/', (req, res) => {
        console.log(req.body);
        const newRecord = {
            fullName: req.body.fullName,
            role: req.body.role,
            city: req.body.city,
        }
        pangolinCrud.create(newRecord)
            .then(data => res.status(201).json(data))
            .catch(err => console.log(err));
    });
    router.put('/:id', validateDbId, (req, res) => {
        const updateRecord = {
            fullName: req.body.fullName,
            role: req.body.role,
            city: req.body.city,

        }
        pangolinCrud.update(req.params.id, updateRecord)
            .then(data => {
                if (data)
                    res.send(data)
                else
                    raiseRecordNotFound(req, res)
            })
            .catch(err => console.log(err));
    });

    router.delete('/:id', validateDbId, (req, res) => {
        pangolinCrud.delete(req.params.id)
            .then(data => {
                if (data)
                    res.send(data)
                else
                    raiseRecordNotFound(req, res)
            })
            .catch(err => console.log(err));
    });

    module.exports = router;

