const { Course } = require('../models/Course');
const { User } = require('../models/User')

async function getAll() {
    return Course.find({}).lean();
}

async function getById(id) {
    return Course.findById(id).lean();
}

async function create(course) {
    return await Course.create(course);
}

async function update(id, course) {
    const existing = await Course.findById(id);
    existing.title = course.title;
    existing.type = course.type;
    existing.certificate = course.certificate;
    existing.image = course.image;
    existing.description = course.description;
    existing.price = Number(course.price);


    await existing.save();
}

async function deleteById(id) {
    await Course.findByIdAndDelete(id);
}

async function signUp(courseId, userId, username) {
    const course = await Course.findById(courseId);
    if (course.signUpList.includes(userId)) {
        throw new Error('Cannot vote twice');
    }
    course.signUpList.push(userId);
    course.signUpPeople.push(username)
    await course.save();
}

async function getLastThreeCourses() {
    return await Course.find().sort({ _id: -1 }).limit(3).lean();
}

async function getUserById(id) {
    return await User.findById(id).lean();
}

async function findOwnCourses(id) {
    return await Course.find({
        owner: {
            $in: [id]
        }
    }).lean()
}

async function findSignUpCourses(username) {
    return await Course.find({signUpPeople:{
        $in:[username]
    }}).lean()
}



module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
    getLastThreeCourses,
    getUserById,
    signUp,
    findOwnCourses,
    findSignUpCourses
}