const pool = require('../config/db.js');

const getNews = async (req,res) => {
    try{
        const result = await pool.query (
            'SELECT * FROM news ORDER BY created_at DESC'
        );
        res.status(200).json(result.rows);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch news'});
    }
};


const createNews = async (req,res) => {
    try{
        const { title, content, author, imageUrl, category} = req.body;
        if (!title || !content) {
            return res.status(400).json({message: 'Title and content are required'});
        }

        // News.create() inserts a new row into the news table
        const result = await pool.query ( //placeholders
            `INSERT INTO news (title, content, author, image_url, category)
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *`,
            [title, content, author || 'Admin', imageUrl || null, category || 'COMPANY']
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch news'});
    }
};


const deleteNews = async (req,res) => {
    try{
        const { id } = req.params; // Get value from the url itself

        // findByPk() finds a single row by its primary key (id)
        const check = await pool.query(
            'SELECT * FROM news WHERE id = $1',
            [id]
        );

        if (check.rows.length === 0) {
            return res.status(404).json({message: 'News not found'});
        }

        // destroy() deletes that specific row from the database
        await pool.query(
            'DELETE FROM news WHERE id = $1',
            [id]
        );

        res.status(200).json({ message: 'News deleted successfully!'});

    } catch (error) {
        console.error('Error deleting news:', error);
        res.status(500).json({ message: 'Failed to fetch news'});
    }
}

module.exports = { getNews, createNews, deleteNews};