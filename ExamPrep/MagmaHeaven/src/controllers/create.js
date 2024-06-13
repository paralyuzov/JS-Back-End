const { create } = require("../services/volcanoService")
const { parseError } = require("../util/parser")

module.exports = {
    createGet: (req, res) => {
        res.render('create', {
            title: 'Create Page'
        })
    },
    createPost: async (req, res) => {
        const volcano = {
            name: req.body.name,
            location: req.body.location,
            elevation: Number(req.body.elevation),
            lastEruption: Number(req.body.lastEruption),
            image: req.body.image,
            typeVolcano: req.body.typeVolcano,
            description: req.body.description,
            owner: req.user._id
        }

        try {
            if (Object.values(volcano).some(v => v === "")) {
                throw new Error('All fields are required!')
            }
            await create(volcano);
            res.redirect('/catalog')
        } catch (error) {
            res.render('create', {
                title: 'Create Page',
                body: volcano,
                errors: parseError(error)
            })
        }
    }
}