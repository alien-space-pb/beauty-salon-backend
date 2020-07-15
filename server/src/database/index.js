import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

import mongoose from 'mongoose'

import databaseConfig from '../config/database';

const models = [ User, File, Appointment ];


class Database {
    constructor(){
        this.init();
        this.mongo();
    }

    /** Faz a conexão com o banco de dados e importa os models */
    init(){
        this.connection = new Sequelize(databaseConfig);

        models
        .map( model => model.init(this.connection))
        .map( model => model.associate && model.associate(this.connection.models));
    }

    mongo(){
        this.mongoConnection = mongoose.connect(
            'mongodb+srv://gobarber:gobarber@cluster0.u4c12.mongodb.net/dbgobarber?retryWrites=true&w=majority',
            { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true }
        )
    }
}

export default new Database();