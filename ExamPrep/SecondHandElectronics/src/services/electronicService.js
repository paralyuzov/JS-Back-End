const { Electronic } = require('../models/Electronic');

async function getAll() {
    return Electronic.find({}).lean();
}

async function getById(id) {
    return Electronic.findById(id).lean();
}

async function create(electronic) {
    return await Electronic.create(electronic);
}

async function update(id, electronic) {
    const existing = await Electronic.findById(id);
    existing.name = electronic.name;
    existing.type = electronic.type;
    existing.damages = electronic.damages;
    existing.image = electronic.image;
    existing.description = electronic.description;
    existing.production = Number(electronic.production);
    existing.exploitation = Number(electronic.exploitation);
    existing.price = Number(electronic.price);

    await existing.save();
}

async function deleteById(id) {
    await Volcano.findByIdAndDelete(id);
}

async function buy(electronicId, userId) {
    const electronic = await Electronic.findById(electronicId);
    if (electronic.buyingList.includes(userId)) {
        throw new Error('Cannot buy twice');
    }
    electronic.buyingList.push(userId);
    await electronic.save();
}

async function searchElectronic(queryName, queryType) {
    if (queryName && queryType) {
        return await Electronic.find({ name: new RegExp(queryName, 'i'), type: new RegExp(queryType, 'i') }).lean();
    }
    if (queryName) {
        return await Electronic.find({ name: new RegExp(queryName, 'i') }).lean();
    }
    if (queryType) {
        return await Electronic.find({ type: new RegExp(queryType, 'i') }).lean();
    }

}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    buy,
    searchElectronic
}