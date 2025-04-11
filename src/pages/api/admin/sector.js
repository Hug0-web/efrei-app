import SectorModel from "@/app/models/sector";
import database_connection from "@/app/database/mongodb";
import { NextResponse } from "next";

// POST
export async function createSector(request) {
        try {

            const { name, classes } = await request.json();

            await database_connection();
            
            await SectorModel.create({ name, classes });
            
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

        const sectors = await SectorModel.find();
        
        return NextResponse.json({ sectors }, { status: 201 });

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

        await SectorModel.findByIdAndDelete(id);
        
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

        const { newName: name, newClasses : classes } = await request.json();

        await database_connection();

        await SectorModel.findByIdAndUpdate(id, { name, classes }, { new: true });

        return NextResponse.json({ message: "La filière a été mise à jour" }, { status: 200 })

    } catch (error) {
        
        console.error(error);

        return NextResponse.json({ error: "La filière n'a pas réussi à se mettre à jour" }, { status: 500 })

    }
}



