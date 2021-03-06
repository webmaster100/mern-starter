import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const answerSchema = new Schema({
  name: { type: 'String', required: true },
  content: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  questionCuid : { type: 'String' ,required: true},
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Answer', answerSchema);
