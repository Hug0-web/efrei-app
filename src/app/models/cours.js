import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const CoursSchema = new Schema({
        student: [
            {

            }
        ],
        teacher: [
            {
                        
            }
        ],
        name: {
            type: String,
            required: true,
        }

});

export default mongoose.model('Cours', CoursSchema);