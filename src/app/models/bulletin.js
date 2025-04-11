import mongoose from 'mongoose';
import { CoursSchema } from './cours';
import { NoteSchema } from './note';
import { StudentSchema } from './student';

const Schema = mongoose.Schema;

const BulletinSchema = new Schema({
        student: [
            StudentSchema
        ],
        note: [
            NoteSchema
        ],
        cours: [
            CoursSchema
        ]

});

BulletinModel = mongoose.model('Bulletin', BulletinSchema);

export default BulletinModel;
export { BulletinSchema };