import UserModel from "@/app/models/users";
import database_connection from "@/app/database/mongodb";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
    await database_connection();

    if(req.method === 'POST') {
        try {
            const { email, password } = req.body;

            const user = await UserModel.findOne({ email });
            


            if (!user) {
                return res.status(400).json({ error: "connectez-vous avec de bon identifiants" });
              }

            const passwordCompare = await bcrypt.compare(password, user.password);

            if (!passwordCompare) {
                return res
                  .status(400)
                  .json({ error: "connectez-vous avec de bon identifiants" });
            }

            if(passwordCompare) {
                let jwtToken = jwt.sign({id: user.id}, process.env.JWT_SECRET)
                return res.status(200).json({
                    success: true,
                    data: {
                      token: jwtToken,
                      user: {
                        id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        email: user.email,
                        role: user.role,
                        classe_id: user.classe_id
                      }
                    }
                  });
            }


        } catch (error) {
            console.error(error);   
            return res.status(500).json({ 
                error: "L'utilisateur n'a pas pu se connecté", 
                details: error.message 
            });
        }








    }
}
