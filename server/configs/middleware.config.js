const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const logger = require('morgan')

const cors = require('cors')

const whitelist = [
  process.env.DOMAIN,
  "https://car-two-go.herokuapp.com/",
   "http://localhost:3000",
  "http://localhost:5000",
  "http://localhost:5000/api/mapa/nuevaRuta",
];
const corsOptions = {
    origin: (origin, cb) => {
        const originIsWhitelisted = whitelist.includes(origin)
        cb(null, originIsWhitelisted)
        console.log("Entro")
    },
    credentials: true
}

module.exports = app => {
    app.use(logger('dev'))
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cookieParser())

    app.use(cors(corsOptions))
}