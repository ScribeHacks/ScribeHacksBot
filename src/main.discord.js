"use strict";
exports.__esModule = true;
var discord_1 = require("@typeit/discord");
var dotenv_1 = require("dotenv");
var path_1 = require("path");
var Main = /** @class */ (function () {
    function Main() {
    }
    Object.defineProperty(Main, "Client", {
        get: function () {
            return this._client;
        },
        enumerable: true,
        configurable: true
    });
    Main.start = function () {
        this._client = new discord_1.Client();
        dotenv_1.config({
            path: path_1.resolve(path_1.resolve(__dirname, "../.env"))
        });
        this._client.login(process.env.DISCORD_TOKEN, __dirname + "/*.ts", __dirname + "/*.js");
    };
    return Main;
}());
exports.Main = Main;
Main.start();
