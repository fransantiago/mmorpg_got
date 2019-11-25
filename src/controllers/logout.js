module.exports = {
    store(req, res){
        req.session.destroy( err => {
            if(err) console.log(err);
            res.render('index', {errors: []});
        });
    }
};