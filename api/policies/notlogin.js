module.exports = function(req, res, next) {
   
    if (!req.session.sessionId) {
       
        return next();
    }

    return res.redirect('/');
};