/*const { Sequelize } = require('sequelize');

// Create Sequelize connection using the same credentials as your mysql2 connection
const sequelize = new Sequelize('project1', 'root', 'abhay5678', {
  host: 'localhost',
  dialect: 'mysql',
  logging: console.log
});

// Test the connectionS
sequelize
  .authenticate()
  .then(() => {
    console.log('Sequelize connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database with Sequelize:', err);
  });

module.exports = sequelize;*/