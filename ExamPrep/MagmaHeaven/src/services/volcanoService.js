const { Volcano } = require('../models/Volcano');

async function getAll() {
    return Volcano.find({}).lean();
}

async function getById(id) {
    return Volcano.findById(id).lean();
}

async function create(volcano) {
    return await Volcano.create(volcano);
}

async function update(id, volcano) {
    const existing = await Volcano.findById(id);
    existing.name = volcano.name;
    existing.location = volcano.location;
    existing.elevation = Number(volcano.elevation);
    existing.lastEruption = Number(volcano.lastEruption);
    existing.image = volcano.image;
    existing.typeVolcano = volcano.typeVolcano;
    existing.description = volcano.description;

    await existing.save();
}

async function deleteById(id) {
    await Volcano.findByIdAndDelete(id);
}

async function vote(volcanoId, userId) {
    const volcano = await Volcano.findById(volcanoId);
    if (volcano.voteList.includes(userId)) {
        throw new Error('Cannot vote twice');
    }
    volcano.voteList.push(userId);
    await volcano.save();
}

async function searchVolcano(queryName, queryType) {
    return await Volcano.find({ name: new RegExp(queryName, 'i'), typeVolcano: new RegExp(queryType, 'i') }).lean();
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    vote,
    searchVolcano
}