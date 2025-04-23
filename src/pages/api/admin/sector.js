import SectorModel from "@/app/models/sector";
import database_connection from "@/app/database/mongodb";
import { NextResponse } from "next";

// POST
export async function createSector(request) {
    try {
        const { name, classes } = await request.json();

        await database_connection();
        
        await SectorModel.create({ name, classes });
        
        return NextResponse.json({ message: "La filière a été créée" }, { status: 201 });

    } catch (error) {
        console.error(error);   
        return NextResponse.json({ error: "La filière n'a pas été créée" }, { status: 500 });
    }
}

// GET
export async function readSectors() {
    try {
        await database_connection();

        const sectors = await SectorModel.find()
            .populate({
                path: 'classes',
                populate: [
                    { path: 'student' },
                    { path: 'cours' }
                ]
            });
        
        return NextResponse.json({ sectors }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Aucune filière trouvée" }, { status: 500 });
    }
}

// DELETE
export async function deleteSector(request) {
    try {
        const id = request.nextUrl.searchParams.get('id');

        await database_connection();

        await SectorModel.findByIdAndDelete(id);
        
        return NextResponse.json({ message: "La filière a été supprimée" }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Aucune filière trouvée" }, { status: 500 });
    }
}

// UPDATE
export async function updateSector(request, { params }) {
    try {
        const { id } = params;

        const { newName: name, newClasses: classes } = await request.json();

        await database_connection();

        await SectorModel.findByIdAndUpdate(id, { name, classes }, { new: true });

        return NextResponse.json({ message: "La filière a été mise à jour" }, { status: 200 })

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "La filière n'a pas pu être mise à jour" }, { status: 500 })
    }
}


export default async function handler(req, res) {
    await database_connection();
    

    switch (req.method) {
        case 'GET':
            try {
                const sectors = await SectorModel.find()
                    .populate({
                        path: 'classes',
                        populate: [
                            { path: 'student' },
                            { path: 'cours' }
                        ]
                    });
                return res.status(200).json({ sectors });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "Aucune filière trouvée" });
            }
            case 'POST':
                try {
                    const { name, classes } = req.body;
                    await SectorModel.create({ name, classes });
                    return res.status(201).json({ message: "La filière a été créée" });
                } catch (error) {
                    console.error("Erreur détaillée:", error);
                    return res.status(500).json({ 
                        error: "La filière n'a pas été créée", 
                        details: error.message 
                    });
                }
        case 'DELETE':
            try {
                const { id } = req.query;
                await SectorModel.findByIdAndDelete(id);
                return res.status(200).json({ message: "La filière a été supprimée" });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "Aucune filière trouvée" });
            }
        case 'PATCH':
            try {
                const { id } = req.query;
                const { name, classes } = req.body;
                await SectorModel.findByIdAndUpdate(id, { name, classes }, { new: true });
                return res.status(200).json({ message: "La filière a été mise à jour" });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "La filière n'a pas pu être mise à jour" });
            }
    }
}



