const cookieSession = require('cookie-session')


const session = cookieSession({
    name: "session",
    keys: [process.env.SESSION_KEY],
    maxAge: 24 * 60 * 60 * 100
})

module.exports = session