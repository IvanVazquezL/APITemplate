const { Schema, model } = require('mongoose');

const QuoteSchema = Schema({
    language: {
        type: String,
        required: true
    },
    chapter: {
        type: String,
        required: true  
    },
    quote: {
        type: String,
        required: true
    }
});

QuoteSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model( 'Quote', QuoteSchema );