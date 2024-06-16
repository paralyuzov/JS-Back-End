const { getAll, searchElectronic } = require("../services/electronicService")

module.exports = {
    searchGet:async(req,res) => {
        const electronics = await getAll();
        res.render('search',{
            title:'Search Page',
            electronics
        })
    },
    searchPost:async(req,res) => {
        const queryName = req.body.name;
        const queryType = req.body.type;
        const electronics = await searchElectronic(queryName,queryType);
        res.render('search',{
            title:'Search Page',
            electronics
        })
    }
}