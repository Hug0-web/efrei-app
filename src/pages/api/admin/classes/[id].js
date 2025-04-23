import ClassModel from "@/app/models/classes";
import database_connection from "@/app/database/mongodb";

export default async function handler(req, res) {
    // Nettoyer l'ID en supprimant les espaces et les sauts de ligne
    const { id } = req.query;
    const cleanId = id ? id.toString().trim() : id;

    await database_connection();

    switch (req.method) {
        case "PUT":
            try {
                const { newName: name, newSector: sector, newCours: cours } = req.body;

                if (!name) {
                    return res.status(400).json({ error: "Le nom est requis" });
                }

                const updatedClass = await ClassModel.findByIdAndUpdate(
                    cleanId,
                    { name, sector, cours },
                    { new: true }
                );

                if (!updatedClass) {
                    return res.status(404).json({ error: "Classe introuvable" });
                }

                return res.status(200).json({ message: "La classe a été mise à jour", classe: updatedClass });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "Erreur lors de la mise à jour de la classe" });
            }
            case "DELETE":
            try {
                const deletedClass = await ClassModel.findByIdAndDelete(cleanId);

                if (!deletedClass) {
                    return res.status(404).json({ error: "Classe introuvable à supprimer" });
                }

                return res.status(200).json({ message: "La classe a été supprimée" });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "Erreur lors de la suppression de la classe" });
            }

        default:
            res.setHeader("Allow", ["PUT", "DELETE"]);
            return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
    }
}