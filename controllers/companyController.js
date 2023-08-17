const db = require('../config/db')
const Company = db.Company;
const Employee = db.Employee;

module.exports = {
    insertCompany,
    getOneCompany,
    getAllCompanies,
    getOneCompanyEmployees
}

async function insertCompany(name,location){
    await Company.create({name, location});
}

async function getOneCompany(id) {
    const company = await Company.findByPk(id,{
      include:[{
        model: Profile,
        attributes: ['email','contact'],
      },
      ] 
    });
    return company;
}

  async function getAllCompanies() {
    const companies = await Company.findAll({
      include: [{
          model: Profile,
          attributes: ['email', 'contact'],
        },
      ]
    });
    return companies;
}

async function getOneCompanyEmployees(id) {
  const company = await Company.findByPk(id, { include: [Employee] });
	return company;
}

