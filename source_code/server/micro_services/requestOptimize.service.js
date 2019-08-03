"use strict";

module.exports = {
    requestOpt: function requestOpt(req, res, next) {
        console.log("Start");

        // #Food: Id | Price | Water | Energy | Protein | Lipid | Glucid | Cenlluloza | Ash
        var food = [["Gao Nep Cai", 2000, 14, 344, 20, 1, 75, 1, 1], ["Sup Lo Xanh", 1500, 90, 26, 0, 0, 3, 3, 1], ["Ca Mo", 2400, 73, 151, 0, 0, 0, 0, 1]];

        // #Nutriet: Name | min | max
        var conditionNutri = [["Water", 200, 400], ["Energy", 100, 500], ["Protein", 10, 500], ["Lipid", 5, 150], ["Glucid", 5, 500], ["Cenlluloza", 5, 30], ["Ash", 1, 1000]];

        var inpJSON = {
            food: food,
            conditionNutri: conditionNutri
        };

        var inp = JSON.stringify(inpJSON);

        var spawn = require('child_process').spawn,

        // py = spawn('python', ['./python/testing2.py'])
        py = spawn('python', ['./python/optimize.py', inp]);

        py.stdout.on("data", function (data) {
            console.log("In child process!");
            console.log(data.toString());

            // console.log(JSON.parse(data.toString()))
            //    res.json(JSON.parse(data.toString()))
            res.json(JSON.parse(data.toString()));
        });
    }
};