const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const wordSchema = new Schema({
  word: String,
  definition: String,
  synonyms: String
}, {timestamps: true});

const Word = mongoose.model('Word', wordSchema);
module.exports = Word;
