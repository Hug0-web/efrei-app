import NoteModel from "@/app/models/note";
import database_connection from "@/app/database/mongodb";
import UserModel from "@/app/models/users";


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
                    const { note, user, cours } = req.body;

                    const updatedNote = await NoteModel.findByIdAndUpdate(
                        id,
                        { note, user, cours },
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
            }
        if(req.method === "DELETE") {
                try {
                    const deletedNote = await NoteModel.findByIdAndDelete(id);

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
        }
    }
    if (urlSplit[3] !== user.role) {
        return res.status(500).json({ error: "Vous n'êtes pas un professeur, vous ne pouvez pas accedez à ces données" });
    }
}