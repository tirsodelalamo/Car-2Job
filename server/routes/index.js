module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/api', require('./auth.routes'))
    app.use('/api/profile', require('./profile.routes'))
    app.use('/api/mapa', require ('./map.routes'))
    // CLOUDINARYCONFIG 
    app.use('/api/files', require('./files.routes'))
}