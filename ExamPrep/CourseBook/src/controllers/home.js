const { getLastThreeCourses } = require("../services/courseService")

module.exports = {
    homeGet: async (req, res) => {
        const lastThree = await getLastThreeCourses();
        res.render('home', {
            title: 'Home Page',
            lastThree,
            user: req.user
        })
    }
}