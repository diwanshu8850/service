const express               = require('express'),
      app                   = express(),
      bodyParser            = require('body-parser'),
      mongoose              = require('mongoose'),
      Order                 = require('./models/order-data'),
      User                  = require('./models/user_database'),
      passport              = require('passport'),
      passportLocal         = require('passport-local'),
      Review                = require('./models/reviews'),
      methodOverride        = require('method-override'),
      reviewRouter          = require('./routes/reviews'),
      cookieSession = require('cookie-session'),
      authRoutes = require('./routes/routes'),
      passportSetup = require('./config/passport-setup'),
      keys = require('./config/keys'),
      Carpentor             = require('./models/carpentor-data.js'),
      Ac                    = require('./models/ac-service-data'),
      Plumber               = require('./models/plumber-data'),
      Electrical            = require('./models/electrical-data.js');

app.use(express.static('../'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine','ejs');
app.use(methodOverride('_method'));

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

//set up auth routes
app.use('/auth',authRoutes);

//Passport config
app.use(require('express-session')({
    secret: "Testing",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Serving current user details
app.get('/index',(req,res)=>{
//    console.log(req.user);
   res.send({user: req.user}); 
});

//serving services data
app.get('/ac_service', (req, res)=>{
    Ac.find({},(err, items)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send({data: items});
        }
    });
});

app.get('/plumber_service', (req, res)=>{
    Plumber.find({},(err, items)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send({data: items});
        }
    });
});

app.get('/electrical_service', (req, res)=>{
    Electrical.find({},(err, items)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send({data: items});
        }
    });
});

app.get('/carpentor_service', (req, res)=>{
    Carpentor.find({},(err, items)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send({data: items});
        }
    });
});

// checking user logged in or not
const islogged = (req, res, next)=>{
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('/html/login.html');
}

//Register Post
app.post('/register',(req,res)=>{
    User.register(new User({username: req.body.username}), req.body.password, (err, user)=>{
        if(err){
            console.log(err);
            return res.redirect('/html/sign-up.html');
        }
        if(req.body.password === req.body.passwordRepeat){
            passport.authenticate("local")(req, res, ()=>{
                res.redirect('/'); 
            });
        } else{
            return res.redirect('/html/sign-up.html');
        }
    });
});

//Login Post
app.post('/login',passport.authenticate("local", {
    successRedirect: 'index.html',
    failureRedirect: '/html/login.html'
}));

//logout
app.get('/logout', (req,res)=>{
    req.logout();
    res.redirect('/');
});

//Adding to cart
app.post('/add_cart',islogged,(req, res)=>{
//    console.log(req.query);
    if('Electrical' === req.query.service){
        Electrical.find({_id: req.query.serviceId}, (err, item)=>{
            if(err){
                console.log(err);
            }
            else{
                const service = item[0].services.find((data)=>{
                   return data._id == req.query.id; 
                });
                
                const user = req.user;
                const index = user.orders.findIndex(data=>{
                   return data.name == service.name; 
                });
//                console.log(index);
                if(index!=-1){
                    user.orders[index].quantity+=1;
                } else{
                    user.orders.push({
                        name: service.name,
                        price: service.price,
                        quantity: 1
                    });
                }
                user.save(err=>{
                    if(err){
                        console.log(err);
                    }
//                    else{
//                        console.log(user);
//                    }
                });
                res.redirect('./html/electrical-services.html');
            }
        });
    }
    else if('Plumber' === req.query.service){
        Plumber.find({_id: req.query.serviceId}, (err, item)=>{
            if(err){
                console.log(err);
            }
            else{
                const service = item[0].services.find((data)=>{
                   return data._id == req.query.id; 
                });
                
                const user = req.user;
                const index = user.orders.findIndex(data=>{
                   return data._id == service._id; 
                });
                if(index!=-1){
                    user.orders[index].quantity+=1;
                } else{
                    user.orders.push({
                        name: service.name,
                        price: service.price,
                        quantity: 1
                    });
                }
                user.save(err=>{
                    if(err){
                        console.log(err);
                    }
//                    else{
//                        console.log(user);
//                    }
                });
//                console.log(user);
                res.redirect('./html/plumber.html');
            }
        });
    }
    else if('Carpentor' === req.query.service){
        Carpentor.find({_id: req.query.serviceId}, (err, item)=>{
            if(err){
                console.log(err);
            }
            else{
                const service = item[0].services.find((data)=>{
                   return data._id == req.query.id; 
                });
                
                const user = req.user;
                const index = user.orders.findIndex(data=>{
                   return data._id == service._id; 
                });
                if(index!=-1){
                    user.orders[index].quantity+=1;
                } else{
                    user.orders.push({
                        name: service.name,
                        price: service.price,
                        quantity: 1
                    });
                }
                user.save(err=>{
                    if(err){
                        console.log(err);
                    }
//                    else{
//                        console.log(user);
//                    }
                });
//                console.log(user);
                res.redirect('./html/carpentor.html');
            }
        });
    }
    else if('Ac' === req.query.service){
        Ac.find({_id: req.query.serviceId}, (err, item)=>{
            if(err){
                console.log(err);
            }
            else{
                const service = item[0].services.find((data)=>{
                   return data._id == req.query.id; 
                });
                
                const user = req.user;
                const index = user.orders.findIndex(data=>{
                   return data._id == service._id; 
                });
                if(index!=-1){
                    user.orders[index].quantity+=1;
                } else{
                    user.orders.push({
                        name: service.name,
                        price: service.price,
                        quantity: 1
                    });
                }
                user.save(err=>{
                    if(err){
                        console.log(err);
                    }
//                    else{
//                        console.log(user);
//                    }
                });
//                console.log(user);
                res.redirect('./html/ac-repairs.html');
            }
        });
    }
});

//showing mycart
app.get('/mycart', (req, res)=>{
//    console.log(req.user.orders);
    res.send({data: req.user.orders});
});

//this is for reviews router and we create it in routes folder
app.use('/reviews',reviewRouter);




const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
   console.log("Server has Started.."); 
});