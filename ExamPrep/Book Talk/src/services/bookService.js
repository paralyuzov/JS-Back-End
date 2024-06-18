const { Book } = require('../models/Book');


async function getAll() {
    return Book.find({}).lean();
}

async function getById(id) {
    return Book.findById(id).lean();
}

async function create(book) {
    return await Book.create(book);
}

async function update(id, book) {
    const existing = await Book.findById(id);
    existing.title = book.title;
    existing.author = book.author;
    existing.genre = book.genre;
    existing.stars = Number(book.stars);
    existing.image = book.image;
    existing.bookReview = book.bookReview;


    await existing.save();
}

async function deleteById(id) {
    await Book.findByIdAndDelete(id);
}

async function wish(bookId, userId) {
    const book = await Book.findById(bookId);
    if (book.wishingList.includes(userId)) {
        throw new Error('Cannot vote twice');
    }
    book.wishingList.push(userId);
    await book.save();
}

async function findWishedBooks(id) {
    return await Book.find({
        wishingList: {
            $in: [id]
        }
    }).lean()
}



module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    wish,
    findWishedBooks
}