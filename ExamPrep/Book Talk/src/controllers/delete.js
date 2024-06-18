const { getById, deleteById } = require("../services/bookService");

module.exports = {
    deleteGet: async (req, res) => {
        const book = await getById(req.params.id);
        if (book.owner != req.user._id) {
            return res.redirect('/auth/login')
        }

        await deleteById(req.params.id);
        res.redirect('/catalog')
    }
}