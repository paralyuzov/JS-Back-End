const { getById, update } = require("../services/bookService");
const { parseError } = require("../util/parser");

module.exports = {
    editGet: async (req, res) => {
        const book = await getById(req.params.id);
        if (book.owner != req.user._id) {
            return res.redirect('/auth/login');
        }

        res.render('edit', {
            title: 'Edit Page',
            book,
        })
    },
    editPost: async (req, res) => {
        const book = await getById(req.params.id);
        if (book.owner != req.user._id) {
            return res.redirect('/auth/login');
        }

        const edited = {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            stars: Number(req.body.stars),
            image: req.body.image,
            bookReview: req.body.bookReview
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
                book: Object.assign(edited, { _id: req.params.id }),
                errors: parseError(error)
            })
        }
    }
}