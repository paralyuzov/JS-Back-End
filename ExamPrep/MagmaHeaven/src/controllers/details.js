const { getById } = require("../services/volcanoService")

module.exports = {
    detailsGet: async (req,res) => {
        const volcano = await getById(req.params.id);
        const user = req.user;
        let isOwner = false;
        let isVoted = false;
        if (user) {
            if (volcano.owner == user._id) {
                isOwner = true;
            }
            const votedUser = volcano.voteList.map(x => x.toString());
            
            if (votedUser.includes(req.user._id)) {
                isVoted = true;
            }
        }
        res.render('details',{
            title:'Details Page',
            volcano,
            isOwner,
            user,
            isVoted
        })
    }
}