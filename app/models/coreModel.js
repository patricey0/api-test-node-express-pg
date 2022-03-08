const db = require('../database');

//Core model for factorizing
class CoreModel {
    constructor(data={}) {
        for (const prop in data) {
            this[prop] = data[prop];
        }
    }

    //returning an array with all rows matching args
    static async getArray(...args) {
        try {
            return (await db.query(...args)).rows;
        } catch (error) {
            console.log(error);
        }
    }

    //returning one row matching args
    static async getRow(...args) {
        try {
            return (await this.getArray(...args))[0];
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CoreModel;