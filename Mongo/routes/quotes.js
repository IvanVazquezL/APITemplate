/*
    route: api/quotes
*/

const { Router } = require('express');
const router = Router();

const {
    getQuotes,
    createQuote,
    updateQuote,
    deleteQuote
} = require('../controllers/quotes');

router.get('/', getQuotes);
router.post('/', createQuote);
router.put('/:id', updateQuote);
router.delete('/:id', deleteQuote);

module.exports = router;