const express               = require('express'),
      app                   = express(),
      bodyParser            = require('body-parser'),
      mongoose              = require('mongoose'),
      Order                 = require('./models/order-data'),
      User                  = require('./models/user_database'),
      Review                = require('./models/reviews_database'),
      Carpentor             = require('./models/carpentor-data.js'),
      Ac                    = require('./models/ac-service-data'),
      Plumber               = require('./models/plumber-data'),
      Electrical            = require('./models/electrical-data.js'),
      passport              = require('passport'),
      passportLocal         = require('passport-local');

app.use(express.static('../'));
app.use(bodyParser.urlencoded({extended: true}));

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

//console.log(Ac);


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
                let service;
                item[0].services.forEach(data =>{
                   if(data._id == req.query.id){
                       service = data;
                   } 
                });
                Order.create({
                    name: service.name,
                    price: service.price,
                    quantity: 1
                }, (err, data)=>{
                    if(err){
                        console.log(err);
                    }
                    else{
                        if(req.user.orders.length !== 0){
                            req.user.orders.find({data._id}).populate("orders").exec((err, it)=>{
                                if(err){
                                    console.log(err);
                                }
                                else{
                                    console.log(it);
                                }
                            });
                        }
                        else{
                            req.user.orders.push(data);
                            req.user.save((err, it)=>{
                                if(err){
                                    console.log(err);
                                }
                            });
                        }
                    }
                });
            }
        });
    }
    res.redirect('/html/electrical-services.html');
});








const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
   console.log("Server has Started.."); 
});