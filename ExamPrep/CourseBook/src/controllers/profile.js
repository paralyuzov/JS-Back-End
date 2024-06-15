const { findOwnCourses, findSignUpCourses } = require("../services/courseService");
module.exports = {
    profileGet:async(req,res) => {
        const ownCourses = await findOwnCourses(req.user._id);
        const signUpCourses = await findSignUpCourses(req.user.username);
        console.log(signUpCourses.title)
        const totalCourses = ownCourses.length;
        const totalSignUpCourses = signUpCourses.length;
        res.render('profile',{
            title:'Profile Page',
            ownCourses,
            signUpCourses,
            user:req.user,
            totalCourses,
            totalSignUpCourses
        })
    },
  
}