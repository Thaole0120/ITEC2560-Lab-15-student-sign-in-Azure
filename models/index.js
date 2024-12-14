const { Sequelize, DataTypes} = require('sequelize')
const configJson = require('../config.json')
const createStudentModel = require('./student.js')

//look for an environment variable will be called NODE_ENV and read it's value
//environment variables are set fo your whole computer ( or for a server)
//any application running on this computer or server can read these environment variable
// At Azure, we'll create an environment variable for your server called NODE_ENV and set it to "production" 
//if there is not NODE_ENV set, like on your computer, we'll use the value 'development'
const env = process.env.NODE_ENV || 'development'

const dbPassword = process.env.DB_PASSWORD

const config = configJson[env] // read the configuration object for 'development' or 'production'
config.password = dbPassword

const sequelize = new Sequelize(config)

const database = {
    sequelize: sequelize,
    Sequelize: Sequelize,
}

const studentModel = createStudentModel(sequelize, DataTypes)
const studentModelName = studentModel.name //'Student'
database[studentModelName] = studentModel

module.exports = database

