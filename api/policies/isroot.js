module.exports = function(req, res, next) {
   
    if (req.session.isroot) {
        return next();
    }

    return res.redirect('/login');
};