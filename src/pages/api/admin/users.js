import UserModel from "@/app/models/users";
import database_connection from "@/app/database/mongodb";

export default async function handler(req, res) {
    await database_connection();
    
    switch (req.method) {
        case 'GET':
            return await getUsers(req, res);
        case 'POST':
            return await createUser(req, res);
        case 'DELETE':
            return await deleteUser(req, res);
        case 'PATCH':
            return await updateUser(req, res);
        default:
            return res.status(405).json({ error: 'Method not allowed' });
    }
}

async function getUsers(req, res) {
    try {
        const users = await UserModel.find();
        return res.status(200).json({ users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Impossible de récupérer les utilisateurs" });
    }
}

async function createUser(req, res) {
    try {
        const { first_name, last_name, email, password, role, classe_id, cours_id } = req.body;
        await UserModel.create({ 
            first_name, last_name, email, password, role, classe_id, cours_id 
        });
        return res.status(201).json({ message: "L'utilisateur a été créé" });
    } catch (error) {
        console.error("Erreur détaillée:", error);   
        return res.status(500).json({ 
            error: "L'utilisateur n'a pas pu être créé", 
            details: error.message 
        });
    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.query;
        await UserModel.findByIdAndDelete(id);
        return res.status(200).json({ message: "L'utilisateur a été supprimé" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Impossible de supprimer l'utilisateur" });
    }
}

async function updateUser(req, res) {
    try {
        const { id } = req.query;
        const data = req.body;
        
        await UserModel.findByIdAndUpdate(id, data, { new: true });
        
        return res.status(200).json({ message: "L'utilisateur a été mis à jour" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Impossible de mettre à jour l'utilisateur" });
    }
}


