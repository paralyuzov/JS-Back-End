const { getById, update } = require("../services/volcanoService");

module.exports = {
    editGet:async (req,res) => {
        const volcano = await getById(req.params.id);
        if (volcano.owner != req.user._id) {
            return res.redirect('/auth/login');
        }

        res.render('edit', {
            title: 'Edit Page',
            volcano,
        })
    },
    editPost:async(req,res) => {
        const volcano = await getById(req.params.id);
        if (volcano .owner != req.user._id) {
            return res.redirect('/auth/login');
        }

        const edited = {
            name: req.body.name,
            location: req.body.location,
            elevation: Number(req.body.elevation),
            lastEruption: Number(req.body.lastEruption),
            image: req.body.image,
            typeVolcano: req.body.typeVolcano,
            description: req.body.description,
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
                volcano: Object.assign(edited, { _id: req.params.id }),
                errors: parseError(error)
            })
        }
    }
}