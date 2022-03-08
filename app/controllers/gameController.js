const fetch = require('node-fetch');


const gameController = {

    getRandomCommunes: async (_, res) => {
        //fetching external api to get some cities with population
        await fetch('https://geo.api.gouv.fr/communes?codeRegion=24&fields=nom,codesPostaux,population&format=json&geometry=centre')
            .then(response => response.json())
            //using data to return a json with 4 random cities
            .then(data => {
                const values = Object.values(data)
                const communes = [];
                for (let index = 0; index < 5; index++) {
                    const random = values[Math.floor(Math.random() * values.length)];
                    communes.push(random);
                }
                res.json(communes);
            })
            .catch(err => res.status(500).json(err));
    },




}

module.exports = gameController;