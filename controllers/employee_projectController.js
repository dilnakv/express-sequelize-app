const db = require('../config/db');
const Employee_project = db.Employee_project;
const Employee = db.Employee;
const Project = db.Project;
module.exports = {
    insertEmployeeProject,
    findAllEmployees,
    findAllProjects,
}

async function insertEmployeeProject(employeeId, projectId){
    await Employee_project.create({employeeId, projectId});
}

async function findAllEmployees(){
    const employees= await Employee.findAll({
      include: [
        {
          model: Project,
          attributes: ["name"],
          through: {
            attributes: ["EmployeeId", "ProjectId"],
          }
        },
      ],
    });
     
    return employees;
}

async function findAllProjects(){
    const projects = await Project.findAll({
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
    return projects;
}