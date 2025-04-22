import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    classe_id: {
        type: Schema.Types.ObjectId,
        ref: 'Classe',
        required: true
    },
    cours_id: [{
        type: Schema.Types.ObjectId,
        ref: 'Cours'
    }],
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
        default: 'student'
    }
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;
export { UserSchema };