import CoursModel from "@/app/models/cours";
import database_connection from "@/app/database/mongodb";

export default async function handler(req, res) {
    const url = req.url;
    const urlSplit = url.split("/");
    const email = req.body.email;
    const user = await UserModel.findOne({ email });
    if(urlSplit[3] === user.role) {
        const { id } = req.query;

        await database_connection();

        if (req.method === "PUT") {
                try {
                    const { newName: name, newDescription: description } = req.body;

                    if (!name) {
                        return res.status(400).json({ error: "Le nom est requis" });
                    }

                    const updatedCours = await CoursModel.findByIdAndUpdate(
                        id,
                        { name, description },
                        { new: true }
                    );

                    if (!updatedCours) {
                        return res.status(404).json({ error: "Cours introuvable" });
                    }

                    return res.status(200).json({ message: "Le cours a été mis à jour", cours: updatedCours });
                } catch (error) {
                    console.error(error);
                    return res.status(500).json({ error: "Erreur lors de la mise à jour" });
                }
            }
        if (req.method === "DELETE") {
                try {
                    const deletedCours = await CoursModel.findByIdAndDelete(id);

                    if (!deletedCours) {
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