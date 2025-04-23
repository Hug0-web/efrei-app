import NoteModel from "@/app/models/note";
import database_connection from "@/app/database/mongodb";

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Méthode non autorisée" });
    }

    try {
        const { note } = req.body;
        
        // Vérification que la note est bien fournie
        if (note === undefined || note === null) {
            return res.status(400).json({ error: "La note est requise" });
        }
        
        // Vérification que la note est un nombre
        if (typeof note !== 'number') {
            return res.status(400).json({ error: "La note doit être un nombre" });
        }

        await database_connection();

        await NoteModel.create({ note });

        return res.status(201).json({ message: "La note a été créée" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            error: "La note n'a pas été créée", 
            details: error.message 
        });
    }
}