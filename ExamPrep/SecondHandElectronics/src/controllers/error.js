module.exports = {
    errorGet:(req,res) => {
        res.render('404',{
            title:"Not Found"
        })
    }
}