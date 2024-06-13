const { getAll } = require("../services/volcanoService")

module.exports = {
    catalogGet: async (req, res) => {
        const volcanoes = await getAll();
        res.render('catalog', {
            title: "Catalog Page",
            volcanoes

        })
    }
}