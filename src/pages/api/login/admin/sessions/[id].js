import SessionModel from "@/app/models/session";
import UserModel from "@/app/models/users";
import database_connection from "@/app/database/mongodb";

export default async function handler(req, res) {
    await database_connection();
    const url = req.url;
    const urlSplit = url.split("/");
    const email = req.body.email;
    const user = await UserModel.findOne({ email });
    if(urlSplit[3] === user.role) {
        const { id } = req.query;


        if (req.method === "PUT") {
                try {
                    const { newCours: cours, newDays: days, newMonths: months, newYears: years } = req.body;

                
                    const updatedSession = await SessionModel.findByIdAndUpdate(
                        id,
                        { cours, days, months, years },
                        { new: true }
                    );

                    if (!updatedSession) {
                        return res.status(404).json({ error: "Session introuvable" });
                    }

                    return res.status(200).json({ message: "La Session a été mis à jour", sessions: updatedSession });
                } catch (error) {
                    console.error(error);
                    return res.status(500).json({ error: "Erreur lors de la mise à jour" });
                }
        }
        if (req.method === "PUT") {
            try {
                const deletedSession = await SessionModel.findByIdAndDelete(id);

                if (!deletedSession) {
                    return res.status(404).json({ error: "Cours introuvable à supprimer" });
                }

                return res.status(200).json({ message: "Le cours a été supprimé" });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "Erreur lors de la suppression" });
            }
        }
    }
    
    if (urlSplit[3] !== user.role) {
        return res.status(500).json({ error: "Vous n'êtes pas un professeur, vous ne pouvez pas accedez à ces données" });
    }

}