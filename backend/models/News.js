// Model for the news table — exports functions: getAll, create, deleteById
const pool = require('../config/db.js');

// sequelize.define() creates a new table called "News"
// with the fields we define inside

const NewsTable = async () => {
    try{
        await pool.query(`
            CREATE TABLE IF NOT EXISTS news ( 
                id SERIAL PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                content TEXT NOT NULL,
                author VARCHAR(255) NOT NULL DEFAULT 'Admin',
                image_url VARCHAR(255),
                category VARCHAR(100) DEFAULT 'COMPANY',
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            )
        `);
        console.log('News table ready');
    } catch (error) {
        console.error('Error creating news table:', error);
    }
};

module.exports = { NewsTable}; // share with other files