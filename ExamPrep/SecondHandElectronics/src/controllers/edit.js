const { getById, update } = require("../services/electronicService");
const { parseError } = require("../util/parser");

module.exports = {
    editGet: async (req, res) => {
        const electronic = await getById(req.params.id);
        if (electronic.owner != req.user._id) {
            return res.redirect('/auth/login');
        }

        res.render('edit', {
            title: 'Edit Page',
            electronic
        })
    },
    editPost: async (req, res) => {
        const electronic = await getById(req.params.id);
        if (electronic.owner != req.user._id) {
            console.log('test')
            return res.redirect('/auth/login');
        }

        const edited = {
            name: req.body.name,
            type: req.body.type,
            production: req.body.production,
            exploitation: req.body.exploitation,
            damages: req.body.damages,
            image: req.body.image,
            price: req.body.price,
            description: req.body.description
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
                electronic: Object.assign(edited, { _id: req.params.id }),
                errors: parseError(error)
            })
        }
    }
}