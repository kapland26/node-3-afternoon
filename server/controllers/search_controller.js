const swag = require('../models/swag');

module.exports = {
        search:(req, res, next)=>{
            const {category} = req.query

            if ( !category ) {
                res.status(200).send( swag );
            }else{
                const catSwag = swag.filter( item => item.category == category);
                res.status(200).send(catSwag);
            }
        }
}