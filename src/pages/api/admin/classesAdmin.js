import ClassModel from "@/app/models/classes";
import database_connection from "@/app/database/mongodb";
import { NextResponse } from "next";

// POST
export async function createClass(request) {
    try {
        const { name, student, cours } = await request.json();

        await database_connection();
        
        await ClassModel.create({ name, student, cours });
        
        return NextResponse.json({ message: "La classe a été créée" }, { status: 201 });

    } catch (error) {
        console.error(error);   
        return NextResponse.json({ error: "La classe n'a pas été créée" }, { status: 500 });
    }
}

// GET
export async function readClasses() {
    try {
        await database_connection();

        const classes = await ClassModel.find()
            .populate('student')
            .populate('cours');
        
        return NextResponse.json({ classes }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Aucune classe trouvée" }, { status: 500 });
    }
}

// DELETE
export async function deleteClass(request) {
    try {
        const id = request.nextUrl.searchParams.get('id');

        await database_connection();

        await ClassModel.findByIdAndDelete(id);
        
        return NextResponse.json({ message: "La classe a été supprimée" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Aucune classe trouvée" }, { status: 500 });
    }
}

// UPDATE
export async function updateClass(request, { params }) {
    try {
        const { id } = params;

        const { newName: name, newStudent: student, newCours: cours } = await request.json();

        await database_connection();

        await ClassModel.findByIdAndUpdate(id, { name, student, cours }, { new: true });

        return NextResponse.json({ message: "La classe a été mise à jour" }, { status: 200 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "La classe n'a pas pu être mise à jour" }, { status: 500 })
    }
}

export default async function handler(req, res) {
    await database_connection();
    
    switch (req.method) {
        case 'GET':
            try {
                const classes = await ClassModel.find()
                    .populate('student')
                    .populate('cours');
                return res.status(200).json({ classes });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "Aucune classe trouvée" });
            }
        case 'POST':
            try {
                const { name, student, cours } = req.body;
                await ClassModel.create({ name, student, cours });
                return res.status(201).json({ message: "La classe a été créée" });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "La classe n'a pas été créée" });
            }
        case 'DELETE':
            try {
                const { id } = req.query;
                await ClassModel.findByIdAndDelete(id);
                return res.status(200).json({ message: "La classe a été supprimée" });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "Aucune classe trouvée" });
            }
        case 'PATCH':
            try {
                const { id } = req.query;
                const { name, student, cours } = req.body;
                await ClassModel.findByIdAndUpdate(id, { name, student, cours }, { new: true });
                return res.status(200).json({ message: "La classe a été mise à jour" });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "La classe n'a pas pu être mise à jour" });
            }
    }
}



