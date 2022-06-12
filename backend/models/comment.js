'user strict'

module.exports = (sequelize, DataTypes) => {

    return sequelize.define('comment', {
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
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
            trim: true,
            maxlenght: 500
        },
        imageUrl: {
            type: DataTypes.STRING,
            trim: false
        },
        createdAt: {
            type: DataTypes.DATE,
            required: true,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            required: true,
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