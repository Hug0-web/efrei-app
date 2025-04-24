import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const NoteSchema = new Schema({
    note: {
        type: Number,
        required: true
    },
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    cours: [{
        type: Schema.Types.ObjectId,
        ref: 'Cours',
    }],
});

const NoteModel = mongoose.models.Note || mongoose.model('Note', NoteSchema);

export default NoteModel;
export { NoteSchema };
