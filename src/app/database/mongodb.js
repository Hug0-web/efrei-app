import mongoose from "mongoose";


const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const database = process.env.DATABASE;

const databaseURL = `mongodb+srv://${username}:${password}@cluster0.lmupqov.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`;

const database_connection = async () => { 
    try {
        await mongoose.connect(databaseURL);
        console.log('connexion réussi');
    } catch(error) {
        console.log('problème de connexion :', error);
    }
}

export default database_connection;