const express =require('express');
const empRouter = express.Router();
const  { insertEmployee, updateEmployee, getOneEmployee, getAllEmployees, deleteEmployee, getOneCompanyEmployees, findEmployeeProjects}= require('../controllers/employeeController');

// Get all employees 
empRouter.get('/', async (req, res, next)=>{
    try {
        const employees = await getAllEmployees();
        res.status(200).json({employees: employees});
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});
  
// empRouter.param('employeeId', async (req, res, next, employeeId)=> {
//     try{
//         const employee = await getOneEmployee(employeeId);
//         req.employee = employee;
//         next(); // go to apiRouter.get('/:employeeId')
//     } catch(e) {
//         console.log(e);
//         res.sendStatus(404);
//     }
// });

empRouter.param('employeeId', async (req, res, next, employeeId)=> {
    try{
        const employee = await findEmployeeProjects(employeeId);
        console.log(employee);
        req.employee = employee;
        next(); // 
    } catch(e) {
        console.log(e);
        res.sendStatus(404);
    }
 });

  
// Get an employee 
empRouter.get('/:employeeId',  (req, res, next)=>{
    res.status(200).json({employee: req.employee});
});


// Create an employee
empRouter.post('/',  async (req, res, next)=>{
    try{
        const name = req.body.employee.name;
        const designation = req.body.employee.designation;
        const email = req.body.employee.email;
        const age = req.body.employee.age;
        const contact = req.body.employee.contact;
        const companyId = req.body.employee.companyId;
        if (!name || !designation || !age) {
            return res.sendStatus(400);
        }
        const employee =  await insertEmployee(name, email,designation,age,contact, companyId).then(() => res.json({ message: 'Employee created.' }));
    } catch(e){
        console.log(e);
        res.sendStatus(400);
    }
});

  
// Update an employee 
empRouter.put('/:employeeId',  async (req, res, next)=>{
    try{
        const name = req.body.employee.name;
        const designation = req.body.employee.designation;
        const email = req.body.employee.email;
        const age = req.body.employee.age;
        const employeeId= req.params.employeeId;
  
              if (!name || !designation || !age) {
                return res.sendStatus(400);
             }
  
        const employee =  await updateEmployee(name, designation, email, age, employeeId).then(()=>{return getOneEmployee(employeeId);});
        res.json({employee: employee});
        
    } catch(e){
        console.log(e);
        res.sendStatus(400);
    }
});
  
 
// Delete an employee
empRouter.delete('/:employeeId', async (req, res, next)=>{
    try{
        const employeeId = req.params.employeeId;
        const response = await deleteEmployee(employeeId);
        return res.sendStatus(204);
  
    } catch(e){
        console.log(e);
    }
})
  
module.exports = empRouter;
