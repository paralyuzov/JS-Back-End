const { getAll } = require("../services/electronicService")

module.exports = {
    catalogGet: async (req, res) => {
        const electronics = await getAll();
        res.render('catalog', {
            title: "Catalog Page",
            electronics

        })
    }
}