const { getById, signUp } = require("../services/courseService");


module.exports = {
    signUpGet: async (req, res) => {
        const course = await getById(req.params.id);
        try {
            if (course.owner == req.user._id) {
                throw new Error('Cannot sign up for your own volcano!')
            }
            console.log(req.user);
            await signUp(req.params.id, req.user._id,req.user.username)
            res.redirect(`/catalog/${req.params.id}/details`);

        } catch (error) {
            res.redirect(`/catalog/${req.params.id}/details`)
        }
    }
}