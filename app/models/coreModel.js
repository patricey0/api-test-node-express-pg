const db = require('../database');

//Core model for factorizing
class CoreModel {
    constructor(data={}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    static async getArray(...args) {
        try {
            return (await db.query(...args)).rows;
        } catch (error) {
            console.log(error);
        }
    }

    static async getRow(...args) {
        try {
            return (await this.getArray(...args))[0];
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CoreModel;