import NoteModel from "@/app/models/note";
import database_connection from "@/app/database/mongodb";
import "@/app/models/users";
import "@/app/models/cours";

export default async function handler(req, res) {
    try {
        await database_connection();
        
        if(req.method === 'GET'){
            try {
                const notes = await NoteModel.find().populate("user").populate("cours");
                return res.status(200).json({ notes });
            } catch (error) {   
                console.error(error);
                return res.status(500).json({ error: "Impossible de récupérer les notes" });
            }
        }
        
        if(req.method === 'POST'){
            try {
                const { user, note, cours } = req.body;
                
                if (!user || !note || !cours) {
                    return res.status(400).json({ error: "Tous les champs sont requis" });
                }
                
                await NoteModel.create({ user, note, cours });
                
                return res.status(201).json({ message: "La note a été créée" });
            } catch (error) {
                console.error(error);   
                return res.status(500).json({ error: "La note n'a pas été créée", details: error.message });
            }
        }
        
        // Default response for unsupported methods
        return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}