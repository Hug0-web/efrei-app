import mongoose from 'mongoose';



const Schema = mongoose.Schema;

/*const BulletinSchema = new Schema({
    note: [
        NoteSchema
    ],
    cours: [
        CoursSchema
    ]

});

const StudentSchema = new Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },    
    bulletin: [
        BulletinSchema
    ]
});


const CoursSchema = new Schema({
    student: [
        StudentSchema
    ],
    teacher: [
        TeacherSchema
    ],
    name: {
        type: String,
        required: true,
    }

});

const ClassSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    student: [
        StudentSchema
    ],
    cours: [
        CoursSchema
    ]
    
});*/

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

