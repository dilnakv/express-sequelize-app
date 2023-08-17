const express = require('express');
const employee_projectRoute = express();
const {insertEmployeeProject, findAllEmployees, findAllProjects} = require('../controllers/employee_projectController');

employee_projectRoute.post('/', async(req, res, next) => {
    try{
        const employeeId = req.body.employee_project.employeeId;
        const projectId = req.body.employee_project.projectId;
        const employee_project = await insertEmployeeProject(employeeId,projectId).then(()=> res.json({message: 'Project assigned to employee'}))
    }catch(e){
        console.log(e);
        res.sendStatus(400);
    }
    
});

// Get all employees and the projects they are working on using the junction table.
employee_projectRoute.get('/employee-project', async (req, res, next)=>{
    try {
        const employees = await findAllEmployees();
        res.status(200).json({employees: employees});
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// Get all projects and the employees  working on them using the junction table.  
employee_projectRoute.get('/project-employee', async (req, res, next)=>{
    try {
        const projects = await findAllProjects();
        res.status(200).json({projects: projects});
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
 });

 
module.exports = employee_projectRoute;
