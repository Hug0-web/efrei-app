import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const SessionSchema = new Schema({
    cours: [{
        type: Schema.Types.ObjectId,
        ref: 'Cours',
    }],
    days: {
        type: Number,
        min: 1,
        max: 31
    },
    months: {
        type: Number,
        min: 1,
        max: 12,
    },
    years: {
        type: String,
    }
});

const SessionModel = mongoose.models.Sessions || mongoose.model('Sessions', SessionSchema);

export default SessionModel;
export { SessionSchema };