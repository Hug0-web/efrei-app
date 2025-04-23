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