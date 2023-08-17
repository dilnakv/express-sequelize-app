const db = require('../config/db');
const Project = db.Project;
const Employee = db.Employee;
module.exports = {
    insertProject,
    findProjectEmployees
}
async function insertProject(name){
    await Project.create({name});
}

async function findProjectEmployees(id){
    const project = await Project.findByPk(id, {
      include: [
        {
          model: Employee,
           
          attributes: ["name"],
          through: {
            attributes: ["EmployeeId", "ProjectId"],
          }
        },
      ],
    });
    return project;
}