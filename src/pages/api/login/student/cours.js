import CoursModel from "@/app/models/cours";
import UserModel from "@/app/models/users";
import database_connection from "@/app/database/mongodb";



export default async function handler(req, res) {
    
    const url = req.url;
    const urlSplit = url.split("/");
    const email = req.body.email;
    const user = await UserModel.findOne({ email });
    if(urlSplit[3] === user.role) {
        await database_connection();
        if(req.method === 'GET'){
                try {
                
                    const cours = await CoursModel.find()

                    return res.status(200).json({ cours });
                } catch (error) {
                    console.error(error);
                    return res.status(500).json({ error: "Impossible de récupérer les cours" });
                }
        }
    }
    if (urlSplit[3] !== user.role) {
        return res.status(500).json({ error: "Vous n'êtes pas un élève, vous ne pouvez pas accedez à ces données" });
    }
   
}