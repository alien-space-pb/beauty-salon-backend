import Sequelize from 'sequelize';

import User from '../app/models/User';
import File from '../app/models/File';

import databaseConfig from '../config/database';

const models = [ User, File ];


class Database {
    constructor(){
        this.init();
    }

    /** Faz a conexão com o banco de dados e importa os models */
    init(){
        this.connection = new Sequelize(databaseConfig);

        models
        .map( model => model.init(this.connection))
        .map( model => model.associate && model.associate(this.connection.models));
    }
}

export default new Database();