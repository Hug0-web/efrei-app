import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    note: {
        type: Number,
        required: true
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    cours: [{
        type: Schema.Types.ObjectId,
        ref: 'Cours',
        required: true
    }],
});

const NoteModel = mongoose.models.Note || mongoose.model('Note', NoteSchema);

export default NoteModel;
export { NoteSchema };
