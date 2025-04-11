import mongoose from 'mongoose';
import { StudentSchema } from './student';
import { CoursSchema } from './cours';

const Schema = mongoose.Schema;

const ClassSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        student: [
            StudentSchema
        ],
        cours: [
            CoursSchema
        ]
        
});

const ClassModel = mongoose.model('Class', ClassSchema);

export default ClassModel;
export { ClassSchema };