const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dislikeCmSchema = mongoose.Schema({
   userId: {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
   commentId: {
       type: Schema.Types.ObjectId,
       ref: 'Comment'
   }

}, { timestamps: true })


const DislikeCm = mongoose.model('DislikeCm', dislikeCmSchema);

module.exports = { DislikeCm }
