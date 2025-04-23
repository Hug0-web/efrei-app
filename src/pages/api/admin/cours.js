import CoursModel from "@/app/models/cours";
import database_connection from "@/app/database/mongodb";
import { NextResponse } from "next";

// POST
export default async function createCours(req, res) {
    try {
        const { name, description } = req.body;

        await database_connection();

        await CoursModel.create({ name, description });

        return res.status(201).json({ message: "Le cours a été créé" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Le cours n'a pas été créé" });
    }
}

// UPDATE
export async function updateCours(req, res) {
    try {
        const { id, newName: name, newDescription: description } = req.body;

        await database_connection();

        const updatedCours = await CoursModel.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        );
        if (!updatedCours) {
            return res.status(404).json({ error: "Cours introuvable" });
        }

        return res.status(200).json({ message: "Le cours a été mis à jour" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Le cours n'a pas pu être mis à jour" });
    }
}