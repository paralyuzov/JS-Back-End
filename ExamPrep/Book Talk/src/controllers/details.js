const { getById } = require("../services/bookService")

module.exports = {
    detailsGet: async (req, res) => {
        const book = await getById(req.params.id);
        const user = req.user;
        let isOwner = false;
        let isWished = false;
        if (user) {
            if (book.owner == user._id) {
                isOwner = true;
            }

            if (book.wishingList.map(x => x.toString()).includes(user._id)) {
                isWished = true;
            }
        }

        res.render('details', {
            title: book.title,
            book,
            user,
            isOwner,
            isWished
        })
    }
}