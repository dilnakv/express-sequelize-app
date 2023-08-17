module.exports = (sequelize,DataTypes, Employee, Project) =>{
    const Employee_project = sequelize.define(
        "employee_project",
        {
            employeeId: {
                type: DataTypes.INTEGER,
                references: {
                  model: Employee, 
                  key: 'id'
                }
            },
            projectId: {
                type: DataTypes.INTEGER,
                references: {
                  model: Project, 
                  key: 'id'
                }
            }
        },
        {
            tableName: "employee_project",
            timeStamps: false
        }
    );
    return Employee_project;
}