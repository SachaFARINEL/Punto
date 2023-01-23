const mongoose = require('mongoose')

const boardSchema = new mongoose.Schema({
    cases: [{
        type: Map,
        of: mongoose.Schema.Types.ObjectId,
        ref: 'Card',
        default: null
    }],
})

module.exports = mongoose.model('Board', boardSchema)