import NoteModel from "@/app/models/note";
import database_connection from "@/app/database/mongodb";
import { NextResponse } from "next";

// POST
export async function createSector(request) {
        try {

            const { student, note } = await request.json();

            await database_connection();
            
            await NoteModel.create({ student, note });
            
            return NextResponse.json({ message: "La filière a été créer" }, { status: 201 });

        } catch (error) {

            console.error(error);   

            return NextResponse.json({ error: "La filière n'a pas été créer" }, { status: 500 });

        }
    }

// GET
export async function readSector() {
    try {

        await database_connection();

        const notes = await NoteModel.find();
        
        return NextResponse.json({ notes }, { status: 201 });

    } catch (error) {

        console.error(error);

        return NextResponse.json({ error: "Aucune filière trouvé" }, { status: 500 });

    }


}

// DELETE
export async function deleteSector(request) {
    try {

        const id = request.nextUrl.searchParams.get('id');

        await database_connection();

        await NoteModel.findByIdAndDelete(id);
        
        return NextResponse.json({ message: "la filière a été supprimer" }, { status: 200 });

    } catch (error) {
        
        console.error(error);

        return NextResponse.json({ error: "Aucune filière trouvé" }, { status: 500 });

    }
}

// UPDATE
export async function updateSector(request, { params }) {
    try {
        const { id } = params;

        const { newStudent: student, newNote: note } = await request.json();

        await database_connection();

        await NoteModel.findByIdAndUpdate(id, { student, note }, { new: true });

        return NextResponse.json({ message: "La filière a été mise à jour" }, { status: 200 })

    } catch (error) {
        
        console.error(error);

        return NextResponse.json({ error: "La filière n'a pas réussi à se mettre à jour" }, { status: 500 })

    }
}



