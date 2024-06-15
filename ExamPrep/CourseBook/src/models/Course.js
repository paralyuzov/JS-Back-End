const { Schema, model, Types } = require("mongoose");

const URL_PATTERN = /^(http:\/\/|https:\/\/)/;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
        minLength: [5, "Title must be at least 5 characters long"],
    },
    type: {
        type: String,
        required: true,
        minLength: [3, "Type must be at least 3 characters long"],
    },
    certificate: {
        type: String,
        required: true,
        minLength: [2, "Certificate must be at least 2 characters long"],
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: "Image url must be start with http:// or https://",
        },
    },
    description: {
        type: String,
        required: true,
        minLength: [10, "Description must be at least 10 characters long"],
    },
    price: {
        type: Number,
        required: true,
        min: [1, "Price must be a positive number"],
    },
    signUpList: {
        type: [Types.ObjectId],
        ref: "User",
        default: [],
    },
    signUpPeople:{
        type:[String],
        default:[]
    },
    owner: {
        type: Types.ObjectId,
        ref: "User",
        required: true,
    },
});

courseSchema.index(
    { name: 1 },{
        collation: {
            locale: "en",
            strength: 2,
        },
    }
);

const Course = model("Courses", courseSchema);

module.exports = { Course };
