const { getById, getUserById } = require("../services/courseService")

module.exports = {
    detailsGet: async (req, res) => {
        const course = await getById(req.params.id);
        const ownerUser = await getUserById(course.owner);
        const signedUpUsers = course.signUpPeople.join(',');
        const user = req.user;
        let isOwner = false;
        let isSignedUp = false;
        if (user) {
            if (course.owner == user._id) {
                isOwner = true;
            }

            if (signedUpUsers.includes(req.user.username)) {
                isSignedUp = true;
            }
        }
        res.render('details', {
            title: 'Details Page',
            course,
            isSignedUp,
            user,
            isOwner,
            signedUpUsers,
            ownerUser
        })
    }
}