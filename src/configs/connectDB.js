// get the client
const mysql = require('mysql2');

const connection = mysql.createPool({host:'localhost', user: 'root', database: 'nodejs-base'});
const connectionpromise = connection.promise();
export default connectionpromise;