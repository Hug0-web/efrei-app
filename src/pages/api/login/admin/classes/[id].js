import ClassModel from "@/app/models/classes";
import UserModel from "@/app/models/users";
import database_connection from "@/app/database/mongodb";

export default async function handler(req, res) {
    await database_connection();
    const url = req.url;
    
    const urlSplit = url.split("/");
    const role = req.headers.role;
    
    const { id } = req.query;
    

    if(urlSplit[3] === role) {
        if(req.method === "GET"){
            try {
                
                const classes = await ClassModel.findById().populate("sector").populate("cours");

                return res.status(200).json({ classes });
            } catch (error) {
                console.error(error);
                return res.status(500).json({ error: "Impossible de récupérer les classes" });
            }
        }
        if (req.method === "PUT") {
                try {
                    const { newName: name, newSector: sector, newCours: cours } = req.body;

                    if (!name) {
                        return res.status(400).json({ error: "Le nom est requis" });
                    }

                    const updatedClass = await ClassModel.findByIdAndUpdate(
                        id,
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
            }
        if (req.method === "DELETE") {
                try {
                    const deletedClass = await ClassModel.findByIdAndDelete(id);

                    if (!deletedClass) {
                        return res.status(404).json({ error: "Classe introuvable à supprimer" });
                    }

                    return res.status(200).json({ message: "La classe a été supprimée" });
                } catch (error) {
                    console.error(error);
                    return res.status(500).json({ error: "Erreur lors de la suppression de la classe" });
                }
        }
    }
    if (urlSplit[3] !== role) {
        return res.status(500).json({ error: "Vous n'êtes pas un professeur, vous ne pouvez pas accedez à ces données" });
    }   
}