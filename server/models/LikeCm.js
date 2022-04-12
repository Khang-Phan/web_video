const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeCmSchema = mongoose.Schema({
   userId: {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
   commentId: {
       type: Schema.Types.ObjectId,
       ref: 'Comment'
   }

}, { timestamps: true })


const LikeCm = mongoose.model('LikeCm', likeCmSchema);

module.exports = { LikeCm }
