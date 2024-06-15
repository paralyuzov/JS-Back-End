const { getAll } = require("../services/courseService")

module.exports = {
    catalogGet: async (req, res) => {
        const courses = await getAll();
        res.render('catalog', {
            title: "Catalog Page",
            courses

        })
    }
}