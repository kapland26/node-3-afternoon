require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');

const checkForSessions = require('./middlewares/checkForSessions.js');
const swagc = require('./middlewares/swagController.js');
const ac = require('./controllers/auth_controller.js');
const cc = require('./controllers/cart_controller.js');
const searchc = require('./controllers/search_controller.js');

const app = express();

app.use( bodyParser.json() );
app.use(session({ 
    resave: false,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET
}))

app.use( (req, res, next) => checkForSessions(req, res, next));
app.use( express.static( `${__dirname}/../build` ) );

//Swag
app.get("/api/swag", swagc.read);

//Auth
app.post("/api/login", ac.register);
app.post("/api/register", ac.register);
app.post("/api/signout", ac.signout);
app.get("/api/user", ac.getUser);

//Cart
app.post("/api/cart", cc.add);
app.post("/api/cart/checkout", cc.checkout);
app.delete("/api/cart", cc.delete);

//Search
app.get("/api/search", searchc.search);

const port = process.env.PORT || 3000;
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );