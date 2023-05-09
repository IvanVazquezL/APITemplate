const { response } = require('express');

const Quote = require('../models/quote');

const getQuotes = async(req, res = response) => {
    const chapter = req.query.chapter;
    const language = req.query.lang || 'EN';

    const query = {
        language
    };

    if (chapter) {
        query.chapter = chapter;
    }

    console.log(JSON.stringify(query));

    const quotes = await Quote.find(query);

    res.json({
        ok: true,
        quotes
    });
}

const createQuote = async (req, res = response) => {
    const quote = new Quote({
        ...req.body
    });

    try {
        const quoteDB = await quote.save();

        res.json({
            ok: true,
            quote: quoteDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: 'Creating quote error'
        });
    }
}

const updateQuote = async(req, res = response) => {
    const id = req.params.id;

    try {
        const quote = await Quote.findById( id );

        if (!quote) {
            return res.status(404).json({
                ok: true,
                message: 'Quote not found'
            })
        }

        const quoteChanges = {
            ...req.body
        };

        const quoteUpdate = await Quote.findByIdAndUpdate(id, quoteChanges, { new: true });

        res.json({
            ok: true,
            quote: quoteUpdate
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
        const quote = await Quote.findById( id );

        if (!quote) {
            return res.status(404).json({
                ok: true,
                message: 'Quote not found'
            })
        }

        await Quote.findByIdAndDelete(id);

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

