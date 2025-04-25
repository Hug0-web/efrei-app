import NoteModel from "@/app/models/note";
import database_connection from "@/app/database/mongodb";
import "@/app/models/users";
import "@/app/models/cours";
import UserModel from "@/app/models/users";

export default async function handler(req, res) {
    await database_connection();
    const url = req.url;
    const urlSplit = url.split("/");
    const role = req.headers.role;
    if(urlSplit[3] === role) {
        
        
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

                await NoteModel.create({ user, note, cours });

                return res.json({ message: "La note a été créée" }, { status: 201 });
            } catch (error) {
                console.error(error);   
                return res.json({ error: "La note n'a pas été créée" }, { status: 500 });
            }
        }
    }
    if (urlSplit[3] !== role) {
        return res.status(500).json({ error: "Vous n'êtes pas un professeur, vous ne pouvez pas accedez à ces données" });
    }
}