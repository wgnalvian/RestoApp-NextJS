const mysql = require('mysql')

const conn = mysql.createConnection({
    connectionLimit : 10,
    host     : "localhost",
    port     : 3306,
    user     : `root`,
    password : `root`,
    database : `next_resto`
  });


conn.connect((err) => {
    if(err){ 
        console.error('error connecting' + err.stack);
        return
    }

    console.log('connection successfuly')
})

export default conn