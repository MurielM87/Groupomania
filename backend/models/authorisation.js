'use strict';

module.exports = (sequelize, DataTypes) => {
    return sequelize.define('authorisation', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    updatedAt: {
        type: DataTypes.DATE,
        required: true,
        allowNull: false,
        defaultValue: DataTypes.DATETIME
    },
    deletedAt: {
        type: DataTypes.DATE,
        required: true,
        allowNull: false,
        defaultValue: DataTypes.DATETIME
    },
},
{
    underscored: true,
    paranoid: true,
});

};

