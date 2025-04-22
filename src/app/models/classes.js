import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ClassSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    student: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    cours: [{
        type: Schema.Types.ObjectId,
        ref: 'Course'
    }]
});

const ClassModel = mongoose.models.Class || mongoose.model('Class', ClassSchema);

export default ClassModel;
export { ClassSchema };