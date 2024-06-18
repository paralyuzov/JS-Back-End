const { getAll } = require("../services/bookService")

module.exports = {
    catalogGet: async (req, res) => {
        const books = await getAll();
        res.render('catalog', {
            title: "Catalog Page",
            books

        })
    }
}