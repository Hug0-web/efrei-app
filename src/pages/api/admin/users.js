import UserModel from "@/app/models/users";
import database_connection from "@/app/database/mongodb";

export default async function handler(req, res) {
    const url = req.url;
    const urlSplit = url.split("/");
    console.log({ urlSplit });
   await database_connection();
   if(req.method === 'GET'){
        try {
           
            const users = await UserModel.find().populate("cours_id");

            return res.status(200).json({ users });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Impossible de récupérer les utilisateurs" });
        }
   }
   if(req.method === 'POST'){
        try {
            const { first_name, last_name, email, password, role,  cours_id } = req.body;
            
            await UserModel.create({ 
                first_name, last_name, email, password, role, cours_id 
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

