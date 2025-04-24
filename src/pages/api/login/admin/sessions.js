import SessionModel from "@/app/models/session";
import database_connection from "@/app/database/mongodb";

export default async function handler(req, res) {
    const url = req.url;
    const urlSplit = url.split("/");
    const email = req.body.email;
    const user = await UserModel.findOne({ email });
    if(urlSplit[3] === user.role) {
        await database_connection();

        if(req.method === "GET") {
            try {

                const sessions = await SessionModel.find();

                return res.status(200).json({ sessions });

            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "Aucune session trouvée" });
            }
            
        }   
        if(req.method === 'POST') {

            try {

                const { cours, days, months, years } = req.body 

                await SessionModel.create({ cours, days, months, years })

                return res.status(201).json({ message: "La session a été créée" });

            } catch (error) {
                console.error(error);
                return res.status(500).json({ message: "La filière n'a pas été créée" });
            }

        }
    }
    if (urlSplit[3] !== user.role) {
        return res.status(500).json({ error: "Vous n'êtes pas un professeur, vous ne pouvez pas accedez à ces données" });
    }

}