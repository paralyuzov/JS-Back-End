const { create } = require("../services/courseService")
const { parseError } = require("../util/parser")

module.exports = {
    createGet: (req, res) => {
        res.render('create', {
            title: 'Create Page'
        })
    },
    createPost: async (req, res) => {
        const course = {
            title: req.body.title,
            type: req.body.type,
            certificate: req.body.certificate,
            image: req.body.image,
            description: req.body.description,
            price:Number(req.body.price),
            owner: req.user._id
        }

        try {
            if (Object.values(course).some(v => v === "")) {
                throw new Error('All fields are required!')
            }
            await create(course);
            res.redirect('/catalog')
        } catch (error) {
            res.render('create', {
                title: 'Create Page',
                body: course,
                errors: parseError(error)
            })
        }
    }
}