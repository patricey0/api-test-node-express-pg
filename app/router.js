//import router from express
const { Router } = require(`express`);
//import controllers
const { playerController } = require('./controllers');
//router init
const router = Router();
//import jwt middleware to validate token
const { jwt } = require(`./middlewares`);


//player routes
router.get(`/players`, playerController.getAllPlayers);
router.get(`/player/:id`, playerController.getOnePlayer);
router.post(`/player/create`, playerController.createPlayer);
router.delete(`/player/:id`, playerController.deletePlayer);
router.post(`/player/:id/score/update`, playerController.scoreUpdate);

//login
router.post(`/login`, playerController.login);
router.get(`/login/check/:id`,jwt, playerController.checkLogin);


module.exports = router;