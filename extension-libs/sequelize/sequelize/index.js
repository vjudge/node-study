const config = require('config');
const { Sequelize } = require('sequelize');

const { applyExtraSetup } = require('./extra-setup');

const tidb = config.get('tidb');
const sequelize = new Sequelize(tidb);

const modelDefiners = [
    require('./models/user.model')
]

for (const modelItem of modelDefiners) {
    modelItem(sequelize);
}

// applyExtraSetup(sequelize);

module.exports = sequelize;