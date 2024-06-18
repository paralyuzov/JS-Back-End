const { getLastThreeCourses } = require("../services/bookService")

module.exports = {
    homeGet: async (req, res) => {
        res.render('home', {
            title: 'Home Page',
            user: req.user
        })
    }
}