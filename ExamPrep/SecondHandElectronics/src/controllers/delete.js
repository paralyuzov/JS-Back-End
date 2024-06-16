const { getById, deleteById } = require("../services/electronicService");

module.exports = {
    deleteGet:async (req,res) => {
        const volcano = await getById(req.params.id);
        if (volcano.owner != req.user._id) {
            return res.redirect('/auth/login')
        }

        await deleteById(req.params.id);
        res.redirect('/catalog')
    }
}