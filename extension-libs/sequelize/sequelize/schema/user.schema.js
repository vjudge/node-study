const { DataTypes } = require('sequelize');

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
            type: DataTypes.UUIDV4
        },
        userName: {
            allowNull: false,
            type: DataTypes.STRING,
            unique: true,
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