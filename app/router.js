//import router from express
const { Router } = require(`express`);
//import controllers
const { playerController } = require('./controllers');
//router init
const router = Router();


//player routes
router.get(`/players`, playerController.getAllPlayers);
router.post(`/createPlayer`, playerController.createPlayer);


module.exports = router;