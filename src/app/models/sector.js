import mongoose from 'mongoose';
import { ClassSchema } from './classes';


const Schema = mongoose.Schema;

const SectorSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        classes: [
            ClassSchema
        ]
});

SectorModel = mongoose.model('Sector', SectorSchema);

export default SectorModel;

