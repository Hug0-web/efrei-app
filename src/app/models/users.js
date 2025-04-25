import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['student', 'teacher', 'admin'],
    },
    classe_id: [{
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: false,
        default: [],
    }],
});


const UserModel = mongoose.models.User || mongoose.model('User', UserSchema);

export default UserModel;
export { UserSchema };