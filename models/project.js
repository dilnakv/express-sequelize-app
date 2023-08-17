module.exports = (sequelize, DataTypes) =>{
    const Project = sequelize.define(
        "project",
        {
            id:{
                type: DataTypes.INTEGER,
                autoIncrement: true,
                allowNull: false,
                primaryKey: true,
            },
            name:{
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            tableName: "project",
            timeStamps: false
        }
    );
    return Project;
}