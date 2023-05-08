const express = require('express');
const userRouter = express.Router();
const user = require('../model/userModel');
const bcrypt = require("bcryptjs");



userRouter.get('/', (req, res) => {
    user.find({}, (err, data) => {
        try {
            res.send(data);
        } catch (err) {
            res.send(err)
        }
    })
});

userRouter.post('/signup', async (req, res) => {
    const newUser = new user({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
    });
    const User = await newUser.save();
    res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
    });
});


userRouter.post(
    "/signin",
    async (req, res) => {
        const User = await user.findOne({ email: req.body.email });
        if (User) {
            if (bcrypt.compareSync(req.body.password, User.password)) {
                res.send({
                    _id: User._id,
                    name: User.name,
                    email: User.email,
                });
                return;
            }
        }
        res.status(401).send({ message: "Invalid email or password" });
    }
);





module.exports = userRouter;