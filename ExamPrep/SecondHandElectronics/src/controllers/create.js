const { create } = require("../services/electronicService")
const { parseError } = require("../util/parser")

module.exports = {
    createGet: (req, res) => {
        res.render('create', {
            title: 'Add Offer'
        })
    },
    createPost: async (req, res) => {
        const electronic = {
            name: req.body.name,
            type: req.body.type,
            production: Number(req.body.production),
            exploitation: Number(req.body.exploitation),
            damages:req.body.damages,
            image: req.body.image,
            price: req.body.price,
            description: req.body.description,
            owner: req.user._id
        }

        try {
            if (Object.values(electronic).some(v => v === "")) {
                throw new Error('All fields are required!')
            }
            await create(electronic);
            res.redirect('/catalog')
        } catch (error) {
            res.render('create', {
                title: 'Add Offer',
                body: electronic,
                errors: parseError(error)
            })
        }
    }
}