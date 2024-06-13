const { getAll, searchVolcano } = require("../services/volcanoService")

module.exports = {
    searchGet:async(req,res) => {
        const volcanoes = await getAll();
        res.render('search',{
            title:'Search Page',
            volcanoes
        })
    },
    searchPost:async(req,res) => {
        const queryName = req.body.name;
        const queryType = req.body.typeVolcano;
        const volcanoes = await searchVolcano(queryName,queryType);
        res.render('search',{
            title:'Search Page',
            volcanoes
        })
    }
}