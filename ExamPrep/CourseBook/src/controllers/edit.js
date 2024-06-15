const { getById, update } = require("../services/courseService");
const { parseError } = require("../util/parser");

module.exports = {
    editGet: async (req, res) => {
        const course = await getById(req.params.id);
        if (course.owner != req.user._id) {
            return res.redirect('/auth/login');
        }

        res.render('edit', {
            title: 'Edit Page',
            course,
        })
    },
    editPost: async (req, res) => {
        const course = await getById(req.params.id);
        if (course.owner != req.user._id) {
            return res.redirect('/auth/login');
        }

        const edited = {
            title: req.body.title,
            type: req.body.type,
            certificate: req.body.certificate,
            image: req.body.image,
            description: req.body.description,
            price: req.body.price
        }

        try {
            if (Object.values(edited).some(v => v === "")) {
                throw new Error('All fields are required!')
            }
            await update(req.params.id, edited);
            res.redirect(`/catalog/${req.params.id}/details`)
        } catch (error) {
            res.render('edit', {
                title: 'Edit Page',
                course: Object.assign(edited, { _id: req.params.id }),
                errors: parseError(error)
            })
        }
    }
}