import UserModel from "@/app/models/users";
import database_connection from "@/app/database/mongodb";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



export default async function handler(req, res) {
    await database_connection();
    

    if (req.method === "POST") {

        
        console.log(req.body);

       // res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/; Max-Age=0`);

        return res.status(200).json('vous ête déconnecté');
    }
    
}