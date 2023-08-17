module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define(
        "profile",
        {
            id: {
              type: DataTypes.INTEGER(11),
              allowNull: false,
              primaryKey: true,
              autoIncrement: true,
            },
            name: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            email: {
              type: DataTypes.STRING,
              allowNull: false,
            },
            contact: {
              type: DataTypes.STRING,
            },
        },
        {
            tableName: "profile",
            timestamps: false,
        }   
    );
    return Profile;
}