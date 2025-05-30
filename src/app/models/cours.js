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
});

const CoursModel = mongoose.models.Cours || mongoose.model("Cours", CoursSchema);

export default CoursModel;
export { CoursSchema };
