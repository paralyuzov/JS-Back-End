const { getById, vote } = require("../services/volcanoService");


module.exports = {
    voteGet: async (req, res) => {
        const volcano = await getById(req.params.id);
        try {
            if (volcano.owner == req.user._id) {
                throw new Error('Cannot vote your own volcano!')
            }
            await vote(req.params.id, req.user._id)
            res.redirect(`/catalog/${req.params.id}/details`);

        } catch (error) {
            res.redirect(`/catalog/${req.params.id}/details`)
        }
    }
}