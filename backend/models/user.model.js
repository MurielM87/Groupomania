module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
    user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        unique: true,
    },
    firstname: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
    },
    pseudo: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        required: true,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        required: true,
        allowNull: false
    },
    updatedAt: {
        type: DataTypes.DATE,
        required: true,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
})

return User

}

