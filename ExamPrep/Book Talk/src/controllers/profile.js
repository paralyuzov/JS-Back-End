const { findWishedBooks } = require("../services/bookService");
module.exports = {
    profileGet:async(req,res) => {
        const wishedBooks = await findWishedBooks(req.user._id);
        res.render('profile',{
            title:'Profile Page',
            wishedBooks,
            user:req.user
        })
        
    },
  
}