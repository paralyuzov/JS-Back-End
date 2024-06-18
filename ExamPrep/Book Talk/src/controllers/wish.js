const { getById, wish } = require("../services/bookService");


module.exports = {
    wishGet: async (req, res) => {
        const book = await getById(req.params.id);
        try {
            if (book.owner == req.user._id) {
                throw new Error('Cannot wish your own book!')
            }
            await wish(req.params.id, req.user._id)
            res.redirect(`/catalog/${req.params.id}/details`);

        } catch (error) {
            res.redirect(`/catalog/${req.params.id}/details`)
        }
    }
}