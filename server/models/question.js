import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  name: { type: 'String', required: true },
  title: { type: 'String', required: true },
  content: { type: 'String', required: true },
  slug: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  answers     : [{ type: 'String'}],
  dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Question', questionSchema);
