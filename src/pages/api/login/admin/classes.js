import ClassModel from "@/app/models/classes";
import UserModel from "@/app/models/users";
import SectorModel from "@/app/models/sector";
import CoursModel from "@/app/models/cours";
import database_connection from "@/app/database/mongodb";
import { NextResponse } from "next";
import Login from "@/pages/login";


export default async function handler(req, res) {
    await database_connection();
    const url = req.url;
    
    const urlSplit = url.split("/");
    const role = req.headers.role;
    
    const email = req.body.email;
    
    const user = await UserModel.findOne({ email });
    if(urlSplit[3] === role) {
  
        if(req.method === 'GET'){
                try {
                
                    const classes = await ClassModel.find().populate("sector").populate("cours");

                    return res.status(200).json({ classes });
                } catch (error) {
                    console.error(error);
                    return res.status(500).json({ error: "Impossible de récupérer les classes" });
                }
        }
        if(req.method === 'POST'){
            try {
            
                const { name, sector, cours } = req.body;

                await ClassModel.create({ name, sector, cours });

                return res.json({ message: "La classe a été créée" }, { status: 201 });
            } catch (error) {
                console.error(error);   
                return res.json({ error: "La classe n'a pas été créée" }, { status: 500 });
            }
        }
    }
    if (urlSplit[3] !== role) {
        return res.status(403).json({ error: "Vous n'êtes pas un admin, vous ne pouvez pas accedez à ces données" });
    }
}


