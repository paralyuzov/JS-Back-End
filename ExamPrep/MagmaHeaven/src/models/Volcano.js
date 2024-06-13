const { Schema, model, Types } = require('mongoose');

const URL_PATTERN = /^(http:\/\/|https:\/\/)/;

const volcanoSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: [2, 'Name must be at least 2 characters long']
    },
    location: {
        type: String,
        required: true,
        minLength: [3, 'Location must be at least 3 characters long']
    },
    elevation: {
        type: Number,
        required: true,
        min: [0, 'Elevation must be equal or greater then 0']
    },
    lastEruption: {
        type: Number,
        required: true,
        min: [0, 'Year of eruption must be equal to or greater then 0'],
        max: [2024, 'Year of eruption must be less than or equal to 2024']
    },
    image: {
        type: String,
        required: true,
        validate: {
            validator: (value) => URL_PATTERN.test(value),
            message: 'Image url must be start with http:// or https://'
        }

    },
    typeVolcano: {
        type: String,
        required: true,
        enum: {
            values: ['Supervolcanoes', 'Submarine', 'Subglacial', 'Mud', 'Stratovolcanoes', 'Shield'],
            message: 'Please enter valid type of volcano:Supervolcanoes,Submarine,Subglacial,Mud,Stratovolcanoes,Shield'
        }
    },
    description: {
        type: String,
        required: true,
        minLength: [10, 'Description must be at least 10 characters long']
    },
    voteList: {
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

volcanoSchema.index({ name: 1 }, {
    collation: {
        locale: 'en',
        strength: 2
    }
})

const Volcano = model('Volcanoes', volcanoSchema);

module.exports = { Volcano }



