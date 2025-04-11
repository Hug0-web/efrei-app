import mongoose from 'mongoose';
import { StudentSchema } from './student';
import { TeacherSchema } from './teacher';

const Schema = mongoose.Schema;

const CoursSchema = new Schema({
        student: [
            StudentSchema
        ],
        teacher: [
            TeacherSchema
        ],
        name: {
            type: String,
            required: true,
        }

});

CoursModel = mongoose.model('Cours', CoursSchema);

export default CoursModel;
export { CoursSchema };
