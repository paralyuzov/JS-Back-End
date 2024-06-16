const { getById, buy } = require("../services/electronicService");


module.exports = {
    buyGet: async (req, res) => {
        const electronic = await getById(req.params.id);
        try {
            if (electronic.owner == req.user._id) {
                throw new Error('Cannot buy your own product.')
            }
            await buy(req.params.id, req.user._id)
            res.redirect(`/catalog/${req.params.id}/details`);

        } catch (error) {
            res.redirect(`/catalog/${req.params.id}/details`)
        }
    }
}