'use strict';

const { Model, DataTypes } = require('sequelize');

class FormPayment extends Model {
  static init(sequelize) {
    super.init({
      description: DataTypes.STRING,
    }, {
      sequelize,
      modelName: 'FormPayment',
    })
  }

  static associate(models) {
    this.hasMany(models.Address, { foreignKey: 'user_id', as: 'addresses' });
    this.belongsToMany(models.Tech, { foreignKey: 'user_id', through: 'user_techs', as: 'techs' });
  }
}

module.exports = FormPayment;