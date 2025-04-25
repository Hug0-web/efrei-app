import CoursModel from "@/app/models/cours";
import UserModel from "@/app/models/users";
import ClassModel from "@/app/models/classes";
import database_connection from "@/app/database/mongodb";
import "@/app/models/users";
import "@/app/models/cours";


export default async function handler(req, res) {
    await database_connection();
    const url = req.url;
    const urlSplit = url.split("/");
    const role = req.headers.role;
    console.log(role);
    console.log(urlSplit[3]);
    if(urlSplit[3] === role) {
        
        
        if(req.method === 'GET'){
                try {
                
                    const cours = await CoursModel.find();

                    return res.status(200).json({ cours });
                } catch (error) {   
                    console.error(error);
                    return res.status(500).json({ error: "Impossible de récupérer les cours" });
                }
        }
        if(req.method === 'POST'){
            try {
                console.log("Requête reçue :", req.body);
                const { name, description } = req.body;

                await CoursModel.create({ name, description });

                return res.json({ message: "Le cours a été créée" }, { status: 201 });
            } catch (error) {
                console.error(error);   
                return res.json({ error: "Le cours n'a pas été créée" }, { status: 500 });
            }
            
        }
    }    
    if (urlSplit[3] !== role) {
        return res.status(500).json({ error: "Vous n'êtes pas un admin, vous ne pouvez pas accedez à ces données" });
    }
}


