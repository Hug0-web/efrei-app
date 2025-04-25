import CoursModel from "@/app/models/cours";
import database_connection from "@/app/database/mongodb";
import UserModel from "@/app/models/users";

export default async function handler(req, res) {
    await database_connection();
    const url = req.url;
    const urlSplit = url.split("/");
    const role = req.headers.role;
    if(urlSplit[3] === role) {
        
        if(req.method === 'GET'){
                try {
            
                const cours = await CoursModel.find();  
                console.log(cours);

                return res.status(200).json({ cours });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "Impossible de récupérer les classes" });
            }
        }
    }
    if (urlSplit[3] !== role) {
        return res.status(500).json({ error: "Vous n'êtes pas un professeur, vous ne pouvez pas accedez à ces données" });
    }
}