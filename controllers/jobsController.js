const db = require('../config/db');

const Jobs = db.Jobs;
module.exports = {
    insertJob,
    updateJob,
    getOneJob,
    getAllJobs,
    deleteJob
}

async function insertJob(jobTitle, minSalary, maxSalary){
    await Jobs.create({jobTitle, minSalary, maxSalary});
}

async function updateJob(jobTitle, minSalary, maxSalary, jobId){
    await Jobs.update({jobTitle, minSalary, maxSalary}, { where: {jobId: jobId}});
}

async function getOneJob(jobId){
    const job = await Jobs.findByPk(jobId);
    return job;
}

async function getAllJobs(){
    const jobs = await Jobs.findAll();
    return jobs;
}

async function deleteJob(jobId){
    const job = getOneJob(jobId);
    await job.destroy();
}