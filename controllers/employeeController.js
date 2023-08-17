const db = require('../config/db');
 
const Employee = db.Employee;
const Profile = db.Profile;
const Company = db.Company;
const Project = db.Project;
 module.exports ={
 
  insertEmployee,
  updateEmployee,
  getOneEmployee,
  getAllEmployees,
  deleteEmployee,
  getOneCompanyEmployees,
  findEmployeeProjects
 };
 
 
 async function  insertEmployee(name, designation, email, age,contact, companyId) {
  const employee = await Employee.create({name, designation, email, age, companyId});
  const employeeId = employee.id;
  await Profile.create({name, email, contact,employeeId}); 
}
 
 
 
  async function updateEmployee (name, designation, email, age, id){
   
    await Employee.update({name, designation, email, age}, { where: {id: id}});
   
 }
 
 
async function getOneEmployee(id) {
  const employee = await Employee.findByPk(id,{
    include:[{
      model: Profile,
      attributes: ['email','contact'],
    },
    ] 
  });
  return employee;
}
 
 
 
 
async function getAllEmployees() {
  const employees = await Employee.findAll({
    include: [{
        model: Profile,
        attributes: ['email', 'contact'],
      },
    ]
  });
   
  return employees;
}
 
   

async function deleteEmployee(id) {
  const employee = await getOneEmployee(id);
  await employee.destroy();
}


async function getOneCompanyEmployees(id) {
  const company = await Company.findByPk(id, { include: [Employee] });
	return company;
}

async function findEmployeeProjects(id){
  const employee= await Employee.findByPk(id, {
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
  return employee; 
}