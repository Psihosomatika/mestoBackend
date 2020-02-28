const mongoose = require('mongoose');
// const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    required: true,
    type: String,
    match: /https?:\/\/([Ww]{3}\.)?([A-Za-z0-9](-?[A-Za-z0-9]+)+(\.[A-Za-z]{2,})+|((2[0-5][0-5]\.|[0-1]?\d?\d?\.){3}(2[0-5][0-5]|[0-1]?\d?\d)))(:\d{2,5})?(\/[\S]*)*/,
    /* validate: {
      validator: (value) => validator.isURL(value),
      massage: 'Это не ссылка',
    }, */
  },
  owner: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  likes: {
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
    ],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
