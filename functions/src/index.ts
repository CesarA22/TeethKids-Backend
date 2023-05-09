import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { user } from "firebase-functions/v1/auth";

const app = admin.initializeApp();
const db = app.firestore();
const colUsers = db.collection("Users");

export const addSampleUser = functions
    .region("southamerica-east1")
    .https.onRequest(async (Request, Response)) => {
        const user = {
            email: "jaozin@gmail.com",
            name: "Joao Silva",
            phone: 19999341398,
            address1: "alameda das arvores 108",
        };
        try{
            const docRef = await colUsers.add(user);
            Response.send("Usuario exemplo insarido. Referencia: " + docRef);
        }catch(e){
            functions.logger.error("Erro ao inserir o Usuario exemplo.");
            Response.send("Erro ao inserir o Usuario exemplo.");
        }
    }

// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
