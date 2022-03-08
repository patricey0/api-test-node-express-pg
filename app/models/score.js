const CoreModel = require (`./coreModel`);


class Score extends CoreModel {

    //method to get all score as a Scoreboard
    static async getScores() {
        try {
            return new Score(await CoreModel.getArray(`SELECT * FROM "scoreboard"`));
        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
        
    }

}

module.exports = Score;