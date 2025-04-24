import SessionModel from "@/app/models/session";
import database_connection from "@/app/database/mongodb";

export default async function handler(req, res) {
    const { id } = req.query;

    await database_connection();

    switch (req.method) {
        case "PUT":
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
            case "DELETE":
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

        default:
            res.setHeader("Allow", ["PUT", "DELETE"]);
            return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
    }
}