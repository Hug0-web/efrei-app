import CoursModel from "@/app/models/cours";
import database_connection from "@/app/database/mongodb";


export default async function handler(req, res) {
    const url = req.url;
    const urlSplit = url.split("/");
    console.log({ urlSplit });
   await database_connection();
   if(req.method === 'GET'){
        try {
           
            const cours = await CoursModel.find()

            return res.status(200).json({ classes });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Impossible de récupérer les classes" });
        }
   }
}