var LocalStrategy   = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
//temporary data store

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');


module.exports = function(passport){

    
	// Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
		console.log('serializing user:', user._id);
		//return the unique id for the user
        return done(null, user._id);
    });

		//deserialize user will call the unique id provided by the serialuser
    passport.deserializeUser(function(id, done) {
		
		User.findById(id, function(err, user){
		
			if(err){
				return done(err, false);
			}
			if(!user){
				return done('user not found', false);
			}
			
			//we found the user
			return done(null, user);
		});
		
    });

    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) { 
		
			User.findOne({username: username}, function(err, user){
				
				if(err){
					return done(err, false);
				}
				//if no user with user name
				if(!user){
					return done('user '+username+' not found!', false);
				}
				//if invalid password
				if(!isValidPassword(user, password)){
					return done('incorrect password', false);
				}
				
				return done(null, user);
			})

        }
    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
			
			User.findOne({username: username}, function(err, user){
				if(err){
					return done(err, false);
				}
				
				if(user){
					console.log('User already exists with username: ' + username);
					//user is found and signed up
					return done(null, false);
				}
				
				var user = new User();
				
				user.username = username;
				user.password = createHash(password);
				user.save(function(err, user){
					if(err){
						return done(err, false);
					}
					console.log('successfully signed up user ' + username);
					return done(null, user);
				});
			});
        })
    );

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};