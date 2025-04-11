import mongoose from 'mongoose';
import { BulletinSchema } from './bulletin';

const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },    
    bulletin: [
        BulletinSchema
    ]
});

const StudentModel = mongoose.model('Student', StudentSchema);

export default StudentModel;
export { StudentSchema };

