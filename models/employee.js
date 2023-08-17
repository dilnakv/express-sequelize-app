module.exports = (sequelize, DataTypes) => {
    const Employee = sequelize.define(
        "employee",
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
            designation: {
                type: DataTypes.STRING,
            },
            age: {
                type: DataTypes.INTEGER
            }
        },
        {
            tableName: "employee",
            timeStamps: false
        }
    );
    return Employee;
}