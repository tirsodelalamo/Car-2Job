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
        
    },
    credentials: true
}

module.exports = app => {
    app.use(logger('dev'))
    app.use(bodyParser.json({limit: '50mb', extended: true}))
    app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))
    app.use(cookieParser())

    app.use(cors(corsOptions))
}