const { Schema, model, Types } = require("mongoose");

const URL_PATTERN = /^(http:\/\/|https:\/\/)/;

const bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: [2, "Title must be at least 2 characters long"],
    },
    author: {
        type: String,
        required: true,
        minLength: [5, "Author must be at least 5 characters long"],
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: "Image url must be start with http:// or https://",
        },
    },
    bookReview: {
        type: String,
        required: true,
        minLength: [10, "Review must be at least 10 characters long."],
    },
    genre: {
        type: String,
        required: true,
        min: [3, "Genre must be at least 3 characters long."],
    },
    stars: {
        type: Number,
        required: true,
        min: [1, "Valid numbers are 1 to 5"],
        max: [5, "Valid numbers are 1 to 5"]
    },
    wishingList: {
        type: [Types.ObjectId],
        ref: "User",
        default: [],
    },
    owner: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
});

bookSchema.index(
    { title: 1 }, {
    collation: {
        locale: "en",
        strength: 2,
    },
}
);

const Book = model("Books", bookSchema);

module.exports = { Book };
