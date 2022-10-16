import { connect, connection } from 'mongoose';


const conn = {
    isConnected: false
}


export async function dbConnect(){
    if (conn.isConnected){
        return;
    }
   const db = await connect(process.env.MONGODB_URL);
   conn.isConnected = db.connection.readyState;

   console.log("DB", db.connection.db.databaseName);
}

connection.on("connected", () => {
    console.log("Connected to DB")
})

// Coonnecttions Events
connection.on("error", (err) => {
    console.log("Error connecting to DB", err)
})