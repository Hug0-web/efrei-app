import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CoursSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    classes: [{
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }]
});

const CoursModel = mongoose.models.Course || mongoose.model('Course', CoursSchema);

export default CoursModel;
export { CoursSchema };
