import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SectorSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        classes: [
            {
                type: Schema.Types.ObjectId, ref: "Class"
            }
        ]
});

export default mongoose.model('Sector', SectorSchema);

