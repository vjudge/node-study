const { Sequelize, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('user', {
        // id: {
        //     allowNull: false,
        //     autoIncrement: true,
        //     type: DataTypes.INTEGER
        // },
        userId: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        userName: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: { args: true, msg: 'username already exists.' },
            validate: {
                // We require usernames to have length of at least 3, and
                // only use letters, numbers and underscores.
                is: /^\w{3,}$/
            }
        },
    }, {
        freezeTableName: true,
        timestamps: true,
        updatedAt: 'utime',
        createdAt: 'ctime'
    });
};