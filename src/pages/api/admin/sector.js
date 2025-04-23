import SectorModel from "@/app/models/sector";
import database_connection from "@/app/database/mongodb";
import { NextResponse } from "next";




export default async function handler(req, res) {
    await database_connection();
    

    switch (req.method) {
        case 'GET':
            try {
                const sectors = await SectorModel.find()
                        
                return res.status(200).json({ sectors });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "Aucune filière trouvée" });
            }
            case 'POST':
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
        default:
            res.setHeader("Allow", ["GET", "POST"]);
            return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
        }
    }



