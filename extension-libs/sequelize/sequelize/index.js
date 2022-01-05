const config = require('config');
const { Sequelize } = require('sequelize');

const { applyExtraSetup } = require('./extra-setup');

const sequelize = new Sequelize(config.get('tidb'));
// const sequelize = new Sequelize(config.get('mysqldb'));

const modelDefiners = [
    require('./schema/user.schema')
]

for (const modelItem of modelDefiners) {
    modelItem(sequelize);
}

// applyExtraSetup(sequelize);

module.exports = sequelize;