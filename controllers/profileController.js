const db = require('../config/db');

const Profile = db.Profile;
const Employee = db.Employee;
module.exports ={
    insertProfile,
    findProfileByEmployee,
};

async function  insertProfile(name, email, contact,employeeId) {
    await Profile.create({name, email, contact,employeeId}); 
}

//Fetching profile details
async function findProfileByEmployee(id){
	const employee= await Employee.findByPk(id, {
        include: [
    	    {
      	        model: Profile , 
      	        attributes: ["email", "contact"],
    	    },
  	    ],
	}); 
	return employee;
}
