const express = require("express")
const HiveRoute  = require("./hives/hiveRoute")

const DEFAULT_ROUTE = "/hive"

class HiveRouter{

    constructor(app){

        const router = express.Router()
        
        new HiveRoute(router)

        app.use(DEFAULT_ROUTE,router)
    }

}

module.exports = HiveRouter
