module.exports = app => {

    // Base URLS
    app.use('/', require('./base.routes.js'))
    app.use('/api', require('./auth.routes'))
    app.use('/api/profile', require('./profile.routes'))
}