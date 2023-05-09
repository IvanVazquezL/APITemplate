const dbConnection = require("../database/config");

const getQuotes = async(req, res = response) => {
    const chapter = req.query.chapter;
    const language = req.query.lang || 'EN';

    let query = 'SELECT * FROM quotes WHERE language = $1';
    let params = [language];
    
    if (chapter) {
      query += ' AND chapter = $2';
      params.push(chapter);
    }

    query += ' ORDER BY chapter ASC';
    
    const quotes = await dbConnection.query(query, params);

    res.json({
        ok: true,
        quotes: quotes.rows
    });
}

const createQuote = async (req, res = response) => {
    const {
        language,
        chapter,
        quote
    } = req.body

    try {
        await dbConnection.query(
            'INSERT INTO quotes (language, chapter, quote) VALUES ($1,$2,$3)', [
                language,
                chapter,
                escapeQuoteForSql(quote)
            ]);

        res.json({
            ok: true,
            quote: {
                language,
                chapter,
                quote: escapeQuoteForSql(quote)
            }
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Creating quote error'
        });
    }
}

function escapeQuoteForSql(quote) {
    return quote.replace(/'/g, "''");
}

const updateQuote = async(req, res = response) => {
    const id = req.params.id;

    try {
        const quoteDB = await dbConnection.query(
            'SELECT * FROM quotes WHERE id = $1',
            [id]
        );

        if (!quoteDB) {
            return res.status(404).json({
                ok: true,
                message: 'Quote not found'
            })
        }

        const {
            language,
            chapter,
            quote
        } = req.body;

        let updateQuery = 'UPDATE quotes SET ';
        let params = [];
        let index = 1;

        for(const [key, value] of Object.entries(req.body)) {
            updateQuery += `${key} = $${index},`;
            params.push(value);
            index++;
        }

        updateQuery = updateQuery.replace(/,$/, '');

        updateQuery += ` WHERE id = $${index}`;

        params.push(id);

        console.log(JSON.stringify({
            updateQuery,
            params
        }));

        await dbConnection.query(
            updateQuery,
            params
        );

        res.json({
            ok: true,
            quote: {
                language,
                chapter,
                quote  
            }
        });
    } catch(error) {
        res.status(500).json({
            ok: false,
            message: 'Quote update error'
        })
    }
}

const deleteQuote = async (req, res = response) => {
    const id = req.params.id;

    try {
        const quoteDB = await dbConnection.query(
            'SELECT * FROM quotes WHERE id = $1',
            [id]
        );

        if (!quoteDB) {
            return res.status(404).json({
                ok: true,
                message: 'Quote not found'
            })
        }

        await dbConnection.query(
            'DELETE FROM quotes WHERE id = $1',
            [id]
        );
        
        res.json({
            ok: true,
            message: 'Quote deleted'
        });
    } catch(error) {
        res.status(500).json({
            ok: false,
            message: 'Quote deletion error'
        })
    }
}


module.exports = {
    getQuotes,
    createQuote,
    updateQuote,
    deleteQuote
}