import CoursModel from "@/app/models/cours";
import database_connection from "@/app/database/mongodb";



export default async function handler(req, res) {
    await database_connection();
    const url = req.url;
    const urlSplit = url.split("/");
    const role = req.headers.role;
    console.log(role);
    if(urlSplit[3] === role) {
        
        if(req.method === 'GET'){
                try {
                
                    const cours = await CoursModel.find();
                    //console.log(cours);
                    return res.status(200).json({ cours });
                } catch (error) {
                    console.error(error);
                    return res.status(500).json({ error: "Impossible de récupérer les cours" });
                }
        }
    }
    if (urlSplit[3] !== role) {
        return res.status(500).json({ error: "Vous n'êtes pas un élève, vous ne pouvez pas accedez à ces données" });
    }
   
}