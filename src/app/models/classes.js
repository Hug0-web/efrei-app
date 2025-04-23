import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    sector: [{
        type: Schema.Types.ObjectId,
        ref: 'Sector'
    }],
    cours: [{
        type: Schema.Types.ObjectId,
        ref: 'Cours'
    }]
});

const ClassModel = mongoose.models.Class || mongoose.model('Class', ClassSchema);

export default ClassModel;
export { ClassSchema };