const mainController = require('./controllers/controller.main'),
    dataController = require('./controllers/controller.datas'),
    dataDateController = require('./controllers/controller.datadates')

module.exports = function(app, passport) {

    // ===========================
    // USER REGISTRATION AND HOME
    // ===========================
    app.get('/', mainController.showIndex)

    app.get('/login', mainController.showLogin)
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/home',
        successFlash: true,
        failureRedirect: '/login',
        failureFlash: true
    }))
    app.get('/signup', mainController.showSignup)
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/home',
        successFlash: true,
        failureRedirect: '/signup',
        failureFlash: true
    }))
    app.get('/home', isLoggedIn, mainController.showHome)
    app.get('/logout', mainController.logout)

    // ===========================
    // DATA API
    // ===========================
    app.get('/api/datas', dataController.getDatas)
    app.post('/api/datas', dataController.postData)
    app.get('/api/datas/:id', dataController.getData)
    app.delete('/api/datas/:id', dataController.deleteData)
    app.put('/api/datas/:id', dataController.updateData)

    // ===========================
    // DATA DATE API
    // ===========================
    app.get('/api/datadates', dataDateController.getDataDates)
    app.post('/api/datadates', dataDateController.postDataDate)
    app.get('/api/datadates/:id', dataDateController.getDataDate)
    app.delete('/api/datadates/:id', dataDateController.deleteDataDate)
    app.put('/api/datadates/:id', dataDateController.updateDataDate)
}

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next()

    res.redirect('/')
}
