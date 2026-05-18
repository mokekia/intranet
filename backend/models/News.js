// Model for the news table — exports functions: getAll, create, deleteById
import  { DataTypes } from 'sequelize';

import sequelize from '..config/db.js';

// sequelize.define() creates a new table called "News"
// with the fields we define inside

const News = sequelize.define ('News', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true, // unique identifier for each row
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },

    author: {
        type: DataTypes.STRING, // short text, max 255 chars. Titles, names, URLs.
        allowNull: false, // required
        defaultValue: 'Admin', // if no author, default = admin ( only ones allowed)
    },

    imageUrl: { // optional imga url for the card
        type: DataTypes.STRING,
        allowNull: true,  // OPTIONAL, can be empty
    },

    category: { // type of news
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: 'COMPANY'
    }

}, {
    tableName: 'news',
    timestamps: true,
});

export default News;