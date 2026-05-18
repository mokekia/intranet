import News from "../models/News";

export const getNews = async (req,res) => {
    try{
        const news = await News.findAll ({
            order: [['createdAt', 'DESC']],
        });
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch news'});
    }
};


export const createNews = async (req,res) => {
    try{
        const { title, content, author, imageUrl, category} = req.body;
        if (!title || !content) {
            return res.status(400).json({message: 'Title and content are required'});
        }

        // News.create() inserts a new row into the news table
        const newNews = await News.create({
            title, 
            content,
            author,
            imageUrl,
            category,
        });

        res.status(200).json(newNews);

    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch news'});
    }
};


export const deleteNews = async (req,res) => {
    try{
        const { id } = req.params; // Get value from the url itself

        // findByPk() finds a single row by its primary key (id)
        const news = await News.findByPk(id);

        if (!news) {
            return res.status(404).json({message: 'News not found'});
        }

        // destroy() deletes that specific row from the database
        await news.destroy()

        res.status(200).json({ message: 'News deleted successfully!'});

    } catch (error) {
        console.error('Error deleting news:', error);
        res.status(500).json({ message: 'Failed to fetch news'});
    }
}