const CoreModel = require (`./coreModel`);
const bcrypt = require(`bcrypt`);

class Player extends CoreModel {

    //method to get all players from DB
    static async findAll() {
        try {
            return new Player(await CoreModel.getArray(`SELECT * FROM "player"`));
        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
        
    }

    //method to get one player from BD with id
    static async findById(id) {
        try {
            return new Player(await CoreModel.getRow('SELECT * FROM "player" WHERE id=$1', [id]));
        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
        
    }

    static async findByPseudo(pseudo) {
        try {
            return new Player(await CoreModel.getRow('SELECT * FROM "player" WHERE pseudo=$1', [pseudo]));
        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
        
    }

    static async create(data) {
        try {
            const password = await bcrypt.hash(data.password, 10);
            data.password = password
            console.log(data);
            const player = new Player(await CoreModel.getRow('SELECT * FROM new_player($1)', [data]));
            console.log(player);
            return player;
        } catch (error) {
            console.log(error);
            if (error) {
                throw new Error(error);
            }
            throw error;
        }
        
    }


    async delete() {
        try {
            // console.log('data:', this.id)
            const player = await CoreModel.getRow('DELETE FROM player WHERE id=$1', [this.id]);
            return player;
        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

    async login() {
        try {
            const player = await CoreModel.getRow('SELECT * FROM "player" WHERE pseudo=$1', [this.pseudo]);
            if (!player) { throw new Error ('Identification failed, pseudo or password invalid.')};
            const isPwdValid = await bcrypt.compare(this.password, player.password);
            if (!isPwdValid) { throw new Error ('Identification failed, pseudo or password invalid.')} 
            return player;
        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
        
    }

    async scoreUpdate() {
        try {
            console.log(this);
            const player = new Player(await CoreModel.getRow(`SELECT * FROM score_update($1)`, [this]));
            return player
        } catch (error) {
            console.log(error);
            if (error.detail) {
                throw new Error(error.detail);
            }
            throw error;
        }
    }

};

module.exports = Player;