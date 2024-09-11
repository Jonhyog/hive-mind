const express = require('express')
const mongoose = require('mongoose');
const MetricsRouter = require("./routes/metricsRouter")
const cors = require('cors');

const app = express()

// Não gosto muito disso
app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://backend-mongo:27017/sensor-monitoring", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB!!!!'))
  .catch(err => console.error(err));

app.route("").get((req, res) => {
    res.status(418).send("Your NodeJs application is up and running");
  });

// Cria os endpoints da API
router = new MetricsRouter(app)

console.log(process.env)
app.listen(3000)