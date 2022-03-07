const { Score } = require(`../models`);

const scoreboardController = {

    getScoreboard: async (_, res) => {
        try {
            res.json(await Score.getScores());
        } catch (error) {
            console.log(error);
            res.status(500).json(error);
        }
    },

}

module.exports = scoreboardController;