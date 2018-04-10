const swag = require('../models/swag');

module.exports = {
    add:(req, res, next)=>{
        const {id} = req.query;
        let {cart} = req.session.user;

        const ind = cart.findIndex(swag => swag.is ==id);

        if(ind === -1){
            let swagInd = swag.find(item => item.id == id);
            cart.push(swagInd);
            req.session.user.total += swagInd.price;
        }
        res.status(200).send( req.session.user );
    },
    delete:(req, res, next)=>{
        const {id} = req.query;
        let {cart} = req.session.user;

        var cartInd = cart.findIndex(item => item.id== id);
        if(cartInd){
            req.session.user.total -= cart[cartInd].price;
            cart.splice(cartInd, 1)
        }
        res.status(200).send( req.session.user );
    },
    checkout:(req, res, next)=>{
        req.session.user.cart = [];
        req.session.user.total = 0.00;
        
        res.status(200).send( req.session.user );
    }
}