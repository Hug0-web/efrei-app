import UserModel from "@/app/models/users";
import database_connection from "@/app/database/mongodb";
import "@/app/models/classes";
import "@/app/models/cours";
import "@/app/models/sector";
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    const url = req.url;
    const urlSplit = url.split("/");
    const email = req.body.email;
    const user = await UserModel.findOne({ email });
    if(urlSplit[3] === user.role) {
        await database_connection();
        if(req.method === 'GET'){
                try {
                
                    const users = await UserModel.find().populate({path : "classe_id", populate : [{
                                                                                            path : "cours"
                                                                                        },
                                                                                        {
                                                                                            path : "sector"
                                                                                        }
                                                                                    ]
                                                                                });
                                                                    
                    return res.status(200).json({ users });
                } catch (error) {
                    console.error(error);
                    return res.status(500).json({ error: "Impossible de récupérer les utilisateurs" });
                }
        }
        if(req.method === 'POST'){
                const { first_name, last_name, email, password, role, classe_id } = req.body;
                try {
                    
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
    }
   if (urlSplit[3] !== user.role) {
    return res.status(500).json({ error: "Vous n'êtes pas un professeur, vous ne pouvez pas accedez à ces données" });
    }
}


/*async function deleteUser(req, res) {
    try {
        const { id } = req.query;
        await UserModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "L'utilisateur a été supprimé" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Impossible de supprimer l'utilisateur" });
    }
}

async function updateUser(req, res) {
    try {
        const { id } = req.query;
        const data = req.body;
        
        await UserModel.findByIdAndUpdate(id, data, { new: true });
        
        return res.status(200).json({ message: "L'utilisateur a été mis à jour" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Impossible de mettre à jour l'utilisateur" });
    }
}
*/

