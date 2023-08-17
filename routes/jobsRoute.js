const express = require('express');
const jobRouter = express.Router();
const {insertJob, updateJob, getOneJob, getAllJobs, deleteJob} = require('../controllers/jobsController');

// Get all employees 
jobRouter.get('/', async (req, res, next)=>{
    try {
        const jobs = await getAllJobs();
        res.status(200).json({jobs: jobs});
    } catch(e) {
        console.log(e);
        res.sendStatus(500);
    }
 });

jobRouter.param('jobId', async(req, res, next, jobId) => {
    try{
        const job = await getOneJob(jobId);
        req.job = job;
        next()
    }catch(e){
        console.log(e);
        res.sendStatus(404);
    }
})

// Get a single job
jobRouter.get('/:jobId',  (req, res, next)=>{
    res.status(200).json({job: req.job});
});


// Create a job 
jobRouter.post('/',  async (req, res, next)=>{
    try{
        console.log(req.body)
        const jobTitle = req.body.jobs.jobTitle;
        const minSalary = req.body.jobs.minSalary;
        const maxSalary = req.body.jobs.maxSalary;
      
        if (!jobTitle || !minSalary || !maxSalary) {
            return res.sendStatus(400);
        }
        const job =  await insertJob(jobTitle, minSalary,maxSalary).then(() => res.json({ message: 'Job created.' }));    
    } catch(e){
        console.log(e);
        res.sendStatus(400);
    }
 });

 
// Update an employee 
jobRouter.put('/:jobId',  async (req, res, next)=>{
    try{
        const jobTitle = req.body.jobs.jobTitle;
        const minSalary = req.body.jobs.minSalary;
        const maxSalary = req.body.jobs.maxSalary;
        const jobId= req.params.jobId;
  
        if (!jobTitle || !minSalary || !maxSalary) {
            return res.sendStatus(400);
        }
        const job =  await updateJob(jobTitle, minSalary, maxSalary, jobId).then(()=>{return getOneJob(jobId);});
        res.json({job: job});
        
    } catch(e){
        console.log(e);
        res.sendStatus(400);
    }
 });
  
  
  
  
 // Delete an employee
 jobRouter.delete('/:jobId', async (req, res, next)=>{
    try{
        const jobId = req.params.jobId;
        const response = await deleteJob(jobId);
        return res.sendStatus(204);
  
    } catch(e){
        console.log(e);
    }
 })
  
  
  
 module.exports = jobRouter;