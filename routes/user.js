const express = require("express");
const router = express.Router();
const { User, Course } = require("../db/index");
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', async (req, res) => {
    const body = req.body;
    const username = body.username;
    const password = body.password;

    const response = await User.create({ username: username, password: password, courses: [] });
    console.log(response);
    res.status(200).json({ mg: "created" });
});

router.get('/courses', async (req, res) => {
    const courses = await Course.find({});
    console.log(courses);
    if (courses) {
        res.status(200).json({ courses: courses });
    }
    else res.status(403).send("cant get");
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    const courseId = req.params.courseId;
    const username = req.headers.username;

    await User.updateOne({
        username: username
    }, {
        "$push": {
            courses: courseId
        }
    })

    res.send("bought");
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const user = await User.findOne({ username: req.headers.username });
    console.log(user.courses);
    const courses = await Course.find({ _id: { "$in": user.courses } });
    console.log(courses);
    res.json(courses);
});

module.exports = router