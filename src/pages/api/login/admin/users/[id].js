import UserModel from "@/app/models/users";
import database_connection from "@/app/database/mongodb";
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    const url = req.url;
    const urlSplit = url.split("/");
    const email = req.body.email;
    const user = await UserModel.findOne({ email });
    if(urlSplit[3] === user.role) {
        const { id } = req.query;
        

        await database_connection();

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
    if (urlSplit[3] !== user.role) {
        return res.status(500).json({ error: "Vous n'êtes pas un professeur, vous ne pouvez pas accedez à ces données" });
    }
}