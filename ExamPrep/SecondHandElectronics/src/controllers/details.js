const { getById } = require("../services/electronicService")

module.exports = {
    detailsGet: async (req,res) => {
        const electronics = await getById(req.params.id);
        const user = req.user;
        let isOwner = false;
        let isBought = false;
        if (user) {
            if (electronics.owner == user._id) {
                isOwner = true;
            }
            const boughtUser = electronics.buyingList.map(x => x.toString());
            
            if (boughtUser.includes(req.user._id)) {
                isBought = true;
            }
        }
        res.render('details',{
            title:'Details Page',
            electronics,
            isOwner,
            user,
            isBought
        })
    }
}