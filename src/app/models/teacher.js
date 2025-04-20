import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const TeacherSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    }, 

});

const TeacherModel = mongoose.model('Teacher', TeacherSchema);

export default TeacherModel;
export { TeacherSchema };