import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SectorSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
});

const SectorModel = mongoose.models.Sector || mongoose.model('Sector', SectorSchema);

export default SectorModel;
export { SectorSchema };

