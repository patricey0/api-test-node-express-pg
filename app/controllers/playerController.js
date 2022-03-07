const { Player } = require(`../models`);
const jwt = require('../services/jwt');

const playerController = {
    
    getAllPlayers: async (_, res) => {
        try {
            res.json(await Player.findAll());
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    getOnePlayer: async (req, res) => {
        try {
            const player = await Player.findById(+req.params.id);
            res.json(player)
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    createPlayer: async (req, res) => {
        try {
            //console.log(req.body);
            const isPseudoExists = await Player.findByPseudo(req.body.pseudo);
            if (isPseudoExists.pseudo) throw new Error().message = `Ce pseudo est déjà utilisé.`;
            const user = await Player.create(req.body);
            console.log('controller create user : ', user);
            // const token = jwt.makeToken(user.id);
            // user["jwt"] = token;
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    login: async (req, res) => {
        try {
            //console.log(req.body);
            const user = await new User(req.body).login();
            //console.log(user);
            const token = jwt.makeToken(user.id);
            //console.log(token);
            user["jwt"] = token;
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    checkPwd: async (req, res) => {
        try {
            const user = await new User(req.body).checkPwd();
            if (!user) { throw new Error ('Identification failed, password incorrect.')};
            res.json(`Identification OK.`)
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },


    deleteUser: async (req, res) => {
        try {
            //console.log(req.params.id);
            await new User({id:+req.params.id}).delete();
            res.json(`The user id : ${+req.params.id} has been deleted.`);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    }
}

module.exports = playerController;