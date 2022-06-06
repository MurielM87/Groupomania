module.exports = (sequelize, DataTypes) => {

    return sequelize.define('like', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        post_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        user_id: {
            type: DataTypes.UUID,
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

