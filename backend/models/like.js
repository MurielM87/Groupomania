'use strict'

module.exports = (sequelize, DataTypes) => {

    return sequelize.define('like', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        post_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        user_pseudo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        published: {
            type: DataTypes.BOOLEAN
        }
    },
    {
        underscored: true,
        paranoid: true,
    });
}