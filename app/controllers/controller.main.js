  module.exports = {
      showIndex: showIndex,
      showLogin: showLogin,
      showSignup: showSignup,
      showHome: showHome,
      logout: logout
  }

  function showIndex(req, res) {
      res.render('pages/index')
  }

  function showLogin(req, res) {
      res.render('pages/login', { message: req.flash('loginMessage') })
  }

  function showSignup(req, res) {
      res.render('pages/signup', { message: req.flash('signupMessage') })
  }

  function showHome(req, res) {
      res.render('pages/home', {
          user: req.user,
          message: req.flash('successMessage')
      })
  }

  function logout(req, res) {
      req.logout()
      res.redirect('/')
  }
