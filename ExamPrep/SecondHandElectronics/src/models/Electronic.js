const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /^(http:\/\/|https:\/\/)/;

const electronicSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'Name must be at least 2 characters long']
    },
    type: {
        type: String,
        required: true,
        minLength: [2, 'Type must be at least 2 characters long']
    },
    damages: {
        type: String,
        required: true,
        minLength: [10, 'Damages must be at least 10 characters long.']
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: 'Image url must be start with http:// or https://'
        }

    },
    description: {
        type: String,
        required: true,
        minLength: [10, 'Description must be at least 10 characters long.'],
        maxLength:[100,'Description can\'t be more then 100 characters.']
    },
    production: {
        type: Number,
        required: true,
        min:[1900,'Year of production can\'t be under 1900.'],
        max:[2023,'Year of production can\'t be over 2023.']
    },
    exploitation: {
        type: Number,
        required: true,
        min:[1,'Explotation must be a positive number.']
    },
    price: {
        type: Number,
        required: true,
        min:[1,'Price must be a positive number.']
    },
    buyingList: {
        type: [Types.ObjectId],
        ref: 'User',
        default: []
    },
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }

})

electronicSchema.index({ name: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

const Electronic = model('Electronics', electronicSchema);

module.exports = { Electronic }



