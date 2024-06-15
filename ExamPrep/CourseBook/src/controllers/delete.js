const { getById, deleteById } = require("../services/courseService");

module.exports = {
    deleteGet:async (req,res) => {
        const course = await getById(req.params.id);
        if (course.owner != req.user._id) {
            return res.redirect('/auth/login')
        }

        await deleteById(req.params.id);
        res.redirect('/catalog')
    }
}