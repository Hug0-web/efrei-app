import NoteModel from "@/app/models/note";
import database_connection from "@/app/database/mongodb";

export default async function handler(req, res) {
    // Nettoyer l'ID en supprimant les espaces et les sauts de ligne
    const { id } = req.query;
    const cleanId = id ? id.toString().trim() : id;

    await database_connection();

    switch (req.method) {
        case "PUT":
            try {
                const { note } = req.body;

                if (note === undefined || note === null) {
                    return res.status(400).json({ error: "La note est requise" });
                }
                
                // Vérification que la note est un nombre
                if (typeof note !== 'number') {
                    return res.status(400).json({ error: "La note doit être un nombre" });
                }

                const updatedNote = await NoteModel.findByIdAndUpdate(
                    cleanId,
                    { note },
                    { new: true, runValidators: true }
                );

                if (!updatedNote) {
                    return res.status(404).json({ error: "Note introuvable" });
                }

                return res.status(200).json({ message: "La note a été mise à jour", note: updatedNote });
            } catch (error) {
                console.error("Erreur détaillée:", error);
                return res.status(500).json({ 
                    error: "Erreur lors de la mise à jour", 
                    details: error.message 
                });
            }
        case "DELETE":
            try {
                const deletedNote = await NoteModel.findByIdAndDelete(cleanId);

                if (!deletedNote) {
                    return res.status(404).json({ error: "Note introuvable à supprimer" });
                }

                return res.status(200).json({ message: "La note a été supprimée" });
            } catch (error) {
                console.error("Erreur détaillée:", error);
                return res.status(500).json({ 
                    error: "Erreur lors de la suppression", 
                    details: error.message 
                });
            }

        default:
            res.setHeader("Allow", ["PUT", "DELETE"]);
            return res.status(405).json({ error: `Méthode ${req.method} non autorisée` });
    }
}