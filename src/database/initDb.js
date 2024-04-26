import getPool from './getPool.js';

const initDB = async () => {
    try {
        let pool = await getPool();

        console.log('Eliminando base de datos...');

        await pool.query('DROP DATABASE IF EXISTS diary');
        
        console.log('Creando base de datos diary...');

        await pool.query('CREATE DATABASE diary');

        await pool.query('USE diary');
        
        console.log('Borrando tablas...');

        await pool.query(
            'DROP TABLE IF EXISTS entryVotes, entryPhotos, entries, users'
        );
        
        console.log('Creando tablas...');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                email VARCHAR(100) UNIQUE NOT NULL,
                firstName VARCHAR(50) DEFAULT NULL,
                lastName VARCHAR(50) DEFAULT NULL,
                password VARCHAR(100) NOT NULL,
                avatar VARCHAR(100) DEFAULT NULL,
                active BOOLEAN DEFAULT false,
                role ENUM('admin', 'normal') DEFAULT 'normal',
                registrationCode CHAR(30),
                recoverPassCode CHAR(10),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
                modifiedAt DATETIME ON UPDATE CURRENT_TIMESTAMP
            )
      `);
     
      await pool.query(`
        CREATE TABLE IF NOT EXISTS entries (
            id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
            title VARCHAR(50) NOT NULL,
            place VARCHAR(30) NOT NULL,
            description TEXT NOT NULL,
            userId INT NOT NULL,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP, 
            FOREIGN KEY (userId) REFERENCES users(id)
        )
     `);

     await pool.query(`
            CREATE TABLE IF NOT EXISTS entryPhotos (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                name VARCHAR(100) NOT NULL,
                entryId INT NOT NULL,
                FOREIGN KEY (entryId) REFERENCES entries(id),
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
    `);

    await pool.query(`
            CREATE TABLE IF NOT EXISTS entryVotes (
                id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
                value TINYINT UNSIGNED NOT NULL,
                userId INT NOT NULL,
                entryId INT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (userId) REFERENCES users(id),
                FOREIGN KEY (entryId) REFERENCES entries(id)
            )
    `);
    console.log('Tablas creadas!');
    process.exit(0);
    } catch (error) {
        console.log(error);
    }
}

initDB();