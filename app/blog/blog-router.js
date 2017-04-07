function isAuthenticated_TOLOGIN(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('login');
	}
}

module.exports = function (app, passport) {
	app.get('/blog', function (req, res) {
		if (req.isAuthenticated()) {
			res.render('main.ejs', {
				user: req.user
			});
		} else {
			res.render('main.ejs', {
				tourist: {}
			});
		}
	});
	
	app.get('/blog/login', function (req, res, next) {
		if (req.isAuthenticated()) {
			res.redirect('/blog');
		}
		return next();
	}, function (req, res) {
		res.render('login', {
			message: req.flash('loginMessage');
		});
	})
	
	app.post('/blog/login', passport.authenticate('blog-login', {
		successRedirect: '/blog',
		failureRedirect: '/blog/login',
		failureFlash: true
	}));
	
	app.get('/blog/signup', function (req, res) {
		res.render('signup.ejs', {
			message: req.flash('signupMessage')
		});
	});
	
	app.post('/blog/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash: true
	}));
	
	app.get('/blog/logout', function(req, res) {
		req.logout();
		res.redirect('/blog');
	});
};