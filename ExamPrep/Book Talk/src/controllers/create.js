const { create } = require("../services/bookService")
const { parseError } = require("../util/parser")

module.exports = {
    createGet: (req, res) => {
        res.render('create', {
            title: 'Create Page'
        })
    },
    createPost: async (req, res) => {
        const book = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            stars: Number(req.body.stars),
            image: req.body.image,
            bookReview: req.body.bookReview,
            owner: req.user._id
        }

        try {
            if (Object.values(book).some(v => v === "")) {
                throw new Error('All fields are required!')
            }
            await create(book);
            res.redirect('/catalog')
        } catch (error) {
            res.render('create', {
                title: 'Create Page',
                body: book,
                errors: parseError(error)
            })
        }
    }
}