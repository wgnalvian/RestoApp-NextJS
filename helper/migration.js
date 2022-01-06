const mysql = require('mysql')
const migration = require('mysql-migrations')
const path = require('path')

const connection = mysql.createPool({
    connectionLimit : 10,
    host     : "localhost",
    port     : 3306,
    user     : `root`,
    password : `root`,
    database : `next_resto`
  });

  migration.init(connection, path.join(__dirname,'../migrations'), () => {
      console.log('finish running migrations')
  });