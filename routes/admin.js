const express = require("express");
const router = express.Router();
const { Admin, Course } = require("../db/index");
const adminMiddleware = require("../middleware/admin");

// Admin Routes
router.post('/signup', async (req, res) => {
    const body = req.body;
    const username = body.username;
    const password = body.password;

    const response = await Admin.create({ username: username, password: password });
    res.status(200).json({ mg: "created" });
});

router.post('/courses', adminMiddleware, async (req, res) => {
    const body = req.body;
    const title = body.title;
    const price = body.price;
    const desc = body.description;
    const imageLink = body.imageLink
    console.log(body);

    const course = await Course.create({
        title: title,
        description: desc,
        price: Number(price),
        imageLink: imageLink
    });
    res.status(200).json({ msg: "created", id: course._id });
});

router.get('/courses', adminMiddleware, async (req, res) => {
    const courses = await Course.find({});
    console.log(courses);
    if (courses) {
        res.status(200).json({ courses: courses });
    }
    else res.status(403).send("cant get");
});

module.exports = router;