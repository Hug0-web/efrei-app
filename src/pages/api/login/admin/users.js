import UserModel from "@/app/models/users";
import database_connection from "@/app/database/mongodb";
import "@/app/models/classes";
import "@/app/models/cours";
import "@/app/models/sector";
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    try {
        await database_connection();
    
        if(req.method === 'GET'){
            try {
                const users = await UserModel.find().populate({
                    path : "classe_id", 
                    populate : [
                        { path : "cours" },
                        { path : "sector" }
                    ]
                });
                                                                
                return res.status(200).json({ users });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "Impossible de récupérer les utilisateurs" });
            }
        }
        
        if(req.method === 'POST'){
            try {
                const { first_name, last_name, email, password, role, classe_id } = req.body;
                
    
                if (!email) {
                    return res.status(400).json({ error: "Email is required" });
                }
                
                
                
                const salt = await bcrypt.genSalt(10);
                const hashedPassword = await bcrypt.hash(password, salt);
                
                await UserModel.create({ 
                    first_name, last_name, email, password: hashedPassword, role, classe_id   
                });

                return res.status(201).json({ message: "L'utilisateur a été créé" });
            } catch (error) {
                console.error(error);   
                return res.status(500).json({ 
                    error: "L'utilisateur n'a pas pu être créé", 
                    details: error.message 
                });
            }
        }
        
        return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
    } catch (error) {
        console.error("Server error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}



