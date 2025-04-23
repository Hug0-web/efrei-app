import UserModel from "@/app/models/users";
import database_connection from "@/app/database/mongodb";

export default async function handler(req, res) {
    const { id } = req.query;

    await database_connection();

    if(req.method === 'PUT'){
        try {
            const data = req.body;
            
            await UserModel.findByIdAndUpdate(id, data, { new: true });
            
            return res.status(200).json({ message: "L'utilisateur a été mis à jour" });
            
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Impossible de mettre à jour l'utilisateur" });
        }
   }
   if(req.method === 'DELETE'){
        try {
            await UserModel.findByIdAndDelete(id);

            return res.status(200).json({ message: "L'utilisateur a été supprimé" });

        } catch (error) {
            console.error(error);

            return res.status(500).json({ error: "Impossible de supprimer l'utilisateur" });
        }
   }
}