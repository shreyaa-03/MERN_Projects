const mongoose = require('mongoose')

const ConnectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_URL)
        console.log(`Database Connected `,connect.connection.host, connect.connection.name)
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = ConnectDB