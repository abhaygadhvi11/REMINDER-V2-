const mysql = require('mysql2');
//const mysql = require('mysql2/promise');


const db = mysql.createConnection({
    host: 'localhost', 
    user: 'root',
    password: 'abhay5678',
    database: 'project1'
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
    console.log('Connected to MySQL database');
});

module.exports = db;

/*
module.exports = {
  development: {
    username: 'root',
    password: 'abhay5678',
    database: 'project1',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  test: {
    username: 'root',
    password: 'abhay5678',
    database: 'project1_test',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  production: {
    username: 'root',
    password: 'abhay5678',
    database: 'project1_production',
    host: 'localhost',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
};*/