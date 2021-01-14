import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs'

class User extends Model {
    static init(sequelize){
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password: Sequelize.VIRTUAL,
            password_hash: Sequelize.STRING,
            provider: Sequelize.BOOLEAN,
        },
        {
            sequelize,
        }
        );

        /** Criptografando a senha */
        this.addHook('beforeSave', async (user)=>{
            if(user.password){
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });

        return this;
    }

    /** Criando e relaçaõ entre a tabela de files e a de User,por causa da coluna avatar_id */
    static associate(models){
        this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' } );
    }

    /** Verificando se a palavra-passe é igula à palavra-passe criptografada */
    checkPassword(password){
        return bcrypt.compare( password, this.password_hash );
    }
}

export default User;132