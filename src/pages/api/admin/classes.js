import ClassModel from "@/app/models/classes";
import database_connection from "@/app/database/mongodb";
import { NextResponse } from "next";

// POST
export async function createClass(request) {
    try {
        const { name, student, cours } = await request.json();

        await database_connection();
        
        await ClassModel.create({ name, student, cours });
        
        return NextResponse.json({ message: "La classe a été créée" }, { status: 201 });

    } catch (error) {
        console.error(error);   
        return NextResponse.json({ error: "La classe n'a pas été créée" }, { status: 500 });
    }
}


