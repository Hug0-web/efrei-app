import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ClassSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        student: [
            {
                type: Schema.Types.ObjectId, ref: "Student"
            }
        ]
});

export default mongoose.model('Class', ClassSchema);