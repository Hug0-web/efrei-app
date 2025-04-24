import SectorModel from "@/app/models/sector";
import database_connection from "@/app/database/mongodb";

export default async function handler(req, res) {
    const { id } = req.query;

    await database_connection();

    switch (req.method) {
        case "PUT":
            try {
                const { name } = req.body;

                if (!name) {
                    return res.status(400).json({ error: "Le nom de la filière est requis" });
                }

                const updatedSector = await SectorModel.findByIdAndUpdate(
                    id,
                    { name },
                    { new: true }
                );

                if (!updatedSector) {
                    return res.status(404).json({ error: "Filière introuvable" });
                }

                return res.status(200).json({ message: "La filière a été mise à jour", sector: updatedSector });

            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "Erreur lors de la mise à jour de la filière" });
            }
            case "DELETE":
            try {
                const deletedSector = await SectorModel.findByIdAndDelete(id);

                if (!deletedSector) {
                    return res.status(404).json({ error: "Filière introuvable à supprimer" });
                }

                return res.status(200).json({ message: "La filière a été supprimée" });

            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "Erreur lors de la suppression de la filière" });
            }

        default:
            res.setHeader("Allow", ["PUT", "DELETE"]);
            return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
    }
}