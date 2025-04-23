import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Définition du schéma seulement s'il n'existe pas déjà
const CoursSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    }, /*
    notes: [{
        
    }]
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },/*
    classes: [{
        type: Schema.Types.ObjectId,
        ref: 'Class'
    }]*/
});

// Utilisation du pattern singleton pour éviter la recompilation du modèle
// Vérifie si le modèle existe déjà avant de le créer
const CoursModel = mongoose.models.Cours || mongoose.model("Cours", CoursSchema);

export default CoursModel;
export { CoursSchema };
