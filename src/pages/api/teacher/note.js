import NoteModel from "@/app/models/note";
import database_connection from "@/app/database/mongodb";
import { NextResponse } from "next";

// POST
export async function createNote(request) {
        try {
            const { student, note } = await request.json();

            await database_connection();
            
            await NoteModel.create({ student, note });
            
            return NextResponse.json({ message: "La note a été créée" }, { status: 201 });

        } catch (error) {
            console.error(error);   
            return NextResponse.json({ error: "La note n'a pas été créée" }, { status: 500 });
        }
    }

// GET
export async function readNotes() {
    try {
        await database_connection();

        const notes = await NoteModel.find()
            .populate('student');
        
        return NextResponse.json({ notes }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Aucune note trouvée" }, { status: 500 });
    }
}

// DELETE
export async function deleteNote(request) {
    try {
        const id = request.nextUrl.searchParams.get('id');

        await database_connection();

        await NoteModel.findByIdAndDelete(id);
        
        return NextResponse.json({ message: "La note a été supprimée" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Aucune note trouvée" }, { status: 500 });
    }
}

// UPDATE
export async function updateNote(request, { params }) {
    try {
        const { id } = params;

        const { newStudent: student, newNote: note } = await request.json();

        await database_connection();

        await NoteModel.findByIdAndUpdate(id, { student, note }, { new: true });

        return NextResponse.json({ message: "La note a été mise à jour" }, { status: 200 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "La note n'a pas pu être mise à jour" }, { status: 500 })
    }
}

export default async function handler(req, res) {
    await database_connection();

    switch (req.method) {
        case 'GET':
            const notes = await NoteModel.find()
                .populate('student');
            return res.status(200).json({ notes });
        case 'POST':
            try {
                const { student, note } = req.body;
                await NoteModel.create({ student, note });
                return res.status(201).json({ message: "La note a été créée" });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "La note n'a pas été créée" });
            }
        case 'DELETE':
            try {
                const { id } = req.query;
                await NoteModel.findByIdAndDelete(id);
                return res.status(200).json({ message: "La note a été supprimée" });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "Aucune note trouvée" });
            }
        case 'PATCH':
            try {
                const { id } = req.query;
                const { student, note } = req.body;
                await NoteModel.findByIdAndUpdate(id, { student, note }, { new: true });
                return res.status(200).json({ message: "La note a été mise à jour" });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "La note n'a pas pu être mise à jour" });
            }
    }
}



