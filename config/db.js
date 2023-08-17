const config = require('./config');
const mysql = require('mysql2');
const Sequelize = require('sequelize');

const { dbhost, dbport, dbuser, dbpassword,database,dbdialect } = config.database;

const pool = mysql.createPool({
    host: dbhost,
    port: dbport,
    user: dbuser,
    password: dbpassword,
})

pool.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

const db = {};
const sequelize = new Sequelize(database, dbuser, dbpassword, {
    dialect: dbdialect,
    pool: {
        max: parseInt(config.pool.max),
        min: parseInt(config.pool.min),
        acquire: config.pool.acquire,
        idle: config.pool.idle
    }
})

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Employee = require('../models/employee')(sequelize, Sequelize);
db.Jobs = require('../models/jobs')(sequelize, Sequelize);
db.Profile = require('../models/profile')(sequelize, Sequelize);
db.Company = require('../models/company')(sequelize, Sequelize);
db.Project = require('../models/project')(sequelize, Sequelize);
db.Employee_project = require('../models/employee_project')(sequelize, Sequelize,db.Employee, db.Project);
db.Employee.hasOne(db.Profile);
db.Profile.belongsTo(db.Employee, { foreignKey: "employeeId" });
db.Company.hasMany(db.Employee);
db.Employee.belongsTo(db.Company,{foreignKey: 'companyId'});
db.Employee.belongsToMany(db.Project, {through: 'Employee_project'});
db.Project.belongsToMany(db.Employee, {through: 'Employee_project'});
sequelize.sync({alert: true});

module.exports = db;
