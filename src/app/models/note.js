import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    /*
    student: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    */
    note: {
        type: Number,
        required: true
    }
});

const NoteModel = mongoose.models.Note || mongoose.model('Note', NoteSchema);

export default NoteModel;
export { NoteSchema };
