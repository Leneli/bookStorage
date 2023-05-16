const {Schema, model} = require('mongoose');

const bookSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: '',
  },
  authors: {
    type: String,
    required: false,
    default: '',
  },
  favorite: {
    type: String,
    required: false,
    default: '',
  },
  fileCover: {
    type: String,
    required: false,
    default: '',
  },
  fileName: {
    type: String,
    required: false,
    default: '',
  },
});

module.exports = model('Book', bookSchema);
