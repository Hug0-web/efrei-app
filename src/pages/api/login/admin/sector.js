import SectorModel from "@/app/models/sector";
import UserModel from "@/app/models/users";
import database_connection from "@/app/database/mongodb";
import { NextResponse } from "next";




export default async function handler(req, res) {
    await database_connection();
    const url = req.url;
    const urlSplit = url.split("/");
    const role = req.headers.role;
    if(urlSplit[3] === role) {
        
        if (req.method === 'GET') {
                try {
                    const sectors = await SectorModel.find()
                            
                    return res.status(200).json({ sectors });
                } catch (error) {
                    console.error(error);
                    return res.status(500).json({ error: "Aucune filière trouvée" });
                }
        }
        if (req.method === 'POST') {
                    try {
                        const { name } = req.body;
                        await SectorModel.create({ name });
                        return res.status(201).json({ message: "La filière a été créée" });
                    } catch (error) {
                        console.error("Erreur détaillée:", error);
                        return res.status(500).json({ 
                            error: "La filière n'a pas été créée", 
                            details: error.message 
                        });
                    }
        }
        if (urlSplit[3] !== role) {
            return res.status(500).json({ error: "Vous n'êtes pas un professeur, vous ne pouvez pas accedez à ces données" });
        }
    }

}

