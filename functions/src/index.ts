import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const app = admin.initializeApp();
const db = app.firestore();
const colUsers = db.collection("Users");

export const addSampleUser = functions
    .region("southamerica-east1")
    .https.onRequest(async(Request, Response) => {
        const user = {
            email: "carlin@gmail.com",
            name: "Carlinhos Macho",
            phone: 19999745542,
            address1: "alameda das bananas 69",
        };
        try{
            const docRef = await colUsers.add(user);
            Response.send("Usuario exemplo insarido. Referencia: " + docRef.id);
        }catch(e){
            functions.logger.error("Erro ao inserir o Usuario exemplo.");
            Response.send("Erro ao inserir o Usuario exemplo.");
        }
    });

export const deleteUser = functions
    .region("southamerica-east1")
    .https.onRequest(async(Request, Response) => {
        const userId = "Zy6EDS34Q070AxctOgRW";
        await colUsers.doc(userId).delete();
        Response.send("Exclusao realizada")
    });


// // Start writing functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
