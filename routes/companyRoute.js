const express = require('express');
const companyRouter = express();
const {insertCompany,getAllCompanies, getOneCompany,getOneCompanyEmployees} = require('../controllers/companyController');

// Get all company
companyRouter.get('/', async (req, res, next)=>{
    try {
        const companies = await getAllCompanies();
        res.status(200).json({companies: companies});
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
});

// companyRouter.param('companyId', async (req, res, next, companyId)=> {
//     try{
//         const company = await getOneCompany(companyId);
//         req.company = company;
//         next(); // go to apiRouter.get('/:employeeId')
//     } catch(e) {
//         console.log(e);
//         res.sendStatus(404);
//     }
// });
  
  
  
  
// Get a company 
companyRouter.get('/:companyId',  (req, res, next)=>{
    res.status(200).json({company: req.company});
});
    
  
// Create a company
companyRouter.post('/',  async (req, res, next)=>{
    try{
        const name = req.body.company.name;
        const location = req.body.company.location;
        if (!name || !location) {
            return res.sendStatus(400);
        }
  
        const company =  await insertCompany(name, location).then(() => res.json({ message: 'Compay created.' }));
    } catch(e){
        console.log(e);
        res.sendStatus(400);
    }
});


companyRouter.param('companyId', async (req, res, next, companyId)=> {
    try{
        const company = await getOneCompanyEmployees(companyId);
        req.company = company;
        next(); // go to apiRouter.get('/:companyId')
    } catch(e) {
        console.log(e);
        res.sendStatus(404);
    }
 });

//Get one company employees
companyRouter.get('/:companyId',  (req, res, next)=>{
    res.status(200).json({company: req.company});
});

module.exports = companyRouter;