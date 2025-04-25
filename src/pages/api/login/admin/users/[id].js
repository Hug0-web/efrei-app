import UserModel from "@/app/models/users";
import database_connection from "@/app/database/mongodb";
import bcrypt from 'bcrypt';
import ClassModel from "@/app/models/classes";
import SectorModel from "@/app/models/sector";
import CoursModel from "@/app/models/cours";


export default async function handler(req, res) {
    await database_connection();
    const url = req.url;
    const urlSplit = url.split("/");
    const { id } = req.query;
    console.log("ID reçu:", id);

    
    console.log(id);
    const role = req.headers.role;
    if(urlSplit[3] === role) {
        if(req.method === "GET"){
            try {
                
                const classes = await UserModel.findById(id).populate({
                    path : "classe_id", 
                    populate : [
                        { path : "cours" },
                        { path : "sector" }
                    ]
                });

                return res.status(200).json({ classes });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "Impossible de récupérer les classes" });
            }
        }     
  
        if(req.method === 'PUT'){
            try {
            
                const data = req.body;
                console.log(data);

                const first_name = data.first_name;
                const last_name = data.last_name;
                const email = data.email;
                const password = data.password;
                const role = data.role;
                const classe_id = data.first_name;

                if (!first_name && !last_name && password && !email && !role && !classe_id) {
                    const salt = await bcrypt.genSalt(10);

                    const hashedPassword = await bcrypt.hash(password, salt);

                    await UserModel.findByIdAndUpdate(id, { password: hashedPassword } , { new: true });
                    
                } else {
                    if(!password) {
                        await UserModel.findByIdAndUpdate(id, {first_name, last_name, email, role, classe_id} , { new: true });
                    } else {
                        const salt = await bcrypt.genSalt(10);

                        const hashedPassword = await bcrypt.hash(password, salt);
        
                        await UserModel.findByIdAndUpdate(id, {first_name, last_name, email, password: hashedPassword, role, classe_id} , { new: true });
                    }
                
                }
                
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
    if (urlSplit[3] !== role) {
        return res.status(500).json({ error: "Vous n'êtes pas un admin, vous ne pouvez pas accedez à ces données" });
    }
}