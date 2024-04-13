import mysql from 'mysql';

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'doug',
    password: '28112003',
    database: 'upload_images'
});

export default connection;