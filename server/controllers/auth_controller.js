const users = require('../models/users');

var id=1;

module.exports = {
    login:(req, res, next) =>{
        const { session } = req;
        const {username, password} = req.body;
        const user = users.find(value => value.username===username && value.password===password);

        if(user){
            session.user.username = user.username;
            res.status(200).send( session.user );
        }else{
            res.status(500).send('Unauthorized.');
        }
    },
    register:(req, res, next) =>{
        const { session } = req;
        const {username, password} = req.body;
        users.push({
            id: id,
            username: username,
            password: password,
        })
        id++;
        session.user.username = username;
        res.status(200).send( session.user );
    },
    signout:(req, res, next) =>{
        req.session.destroy();
        res.status(200).send( req.session );
    },
    getUser:(req, res, next) =>{
        res.status(200).send( req.session.user );
    }
}