const express = require('express');
const projectRoute = express();
const {insertProject, findProjectEmployees} = require('../controllers/projectController');

// Create project
projectRoute.post('/',  async (req, res, next)=>{
    try{
        const name = req.body.project.name;
        if (!name) {
            return res.sendStatus(400);
        }
  
        const project =  await insertProject(name).then(() => res.json({ message: 'Project created.' }));
    } catch(e){
        console.log(e);
        res.sendStatus(400);
    }
});

projectRoute.param('projectId', async (req, res, next, projectId)=> {
    try{
        const project = await findProjectEmployees(projectId);
        req.project = project;
        next(); // go to apiRouter.get('/project/:projectId')
    } catch(e) {
        console.log(e);
        res.sendStatus(404);
    }
 });

projectRoute.get('/:projectId',  (req, res, next)=>{
    res.status(200).json({project: req.project});
});
   

module.exports = projectRoute