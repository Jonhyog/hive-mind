const TemperatureRoute  = require("./metrics/temperatureRoute")
const PressureRoute  = require("./metrics/pressureRoute")
const NoiseRoute  = require("./metrics/noiseRoute")
const UmidityRoute  = require("./metrics/umidityRoute")
const express = require("express")


const DEFAULT_ROUTE = "/metrics"

class MetricsRouter{

    constructor(app){

        const router = express.Router()

        new TemperatureRoute(router)
        new PressureRoute(router)
        new NoiseRoute(router)
        new UmidityRoute(router)
        
        app.use(DEFAULT_ROUTE,router)
    }

}

module.exports = MetricsRouter
