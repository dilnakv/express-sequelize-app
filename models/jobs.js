module.exports = (sequelize,DataTypes) =>{
    const Jobs = sequelize.define(
        "jobs",
        {
            jobId:{
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            jobTitle:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            minSalary: {
                type: DataTypes.DECIMAL(8,2),
            },
            maxSalary: {
                type: DataTypes.DECIMAL(8,2)
            }
        },
        {
            tableName: "jobs",
            timeStamps: false
        }
    );
    return Jobs;
}