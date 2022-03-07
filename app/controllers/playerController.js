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
            const token = jwt.makeToken(user.id);
            user["jwt"] = token;
            res.json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    login: async (req, res) => {
        try {
            //console.log(req.body);
            const user = await new Player(req.body).login();
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


    deletePlayer: async (req, res) => {
        try {
            //console.log(req.params.id);
            await new Player({id:+req.params.id}).delete();
            res.json(`The player id : ${+req.params.id} has been deleted.`);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

    checkLogin: async (req, res) => {
        try {
            const player = await Player.findById({id:+req.params.id});
            res.status(200).json(player);
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },
}

module.exports = playerController;