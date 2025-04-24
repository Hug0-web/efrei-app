import NoteModel from "@/app/models/note";
import UserModel from "@/app/models/users";
import database_connection from "@/app/database/mongodb";
import "@/app/models/users";
import "@/app/models/cours";

export default async function handler(req, res) {
    await database_connection();
    const url = req.url;
    const urlSplit = url.split("/");
    const email = req.body.email;
    const user = await UserModel.findOne({ email });
    if(urlSplit[3] === user.role) {
        
        
        if(req.method === 'GET'){
            try {
            
                const notes = await NoteModel.find().populate("user").populate("cours");

                return res.status(200).json({ notes });
            } catch (error) {   
                console.error(error);
                return res.status(500).json({ error: "Impossible de récupérer les notes" });
            }
        } 
    }   
    if (urlSplit[3] !== user.role) {
        return res.status(500).json({ error: "Vous n'êtes pas un élève, vous ne pouvez pas accedez à ces données" });
    }
}