import mongoose from 'mongoose';
import { StudentSchema } from './student';

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    student: [
        StudentSchema
    ],
    note: Number
});

NoteModel = mongoose.model('Cours', NoteSchema);

export default NoteModel;
export { NoteSchema };
