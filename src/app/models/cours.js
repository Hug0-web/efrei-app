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
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    classes: [{
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }]
});

const CoursModel = mongoose.models.Cours || mongoose.model("Cours", CoursSchema);

export default CoursModel;
export { CoursSchema };
