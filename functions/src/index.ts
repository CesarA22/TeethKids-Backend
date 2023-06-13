import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

const app = admin.initializeApp();
const db = app.firestore();
const colUsers = db.collection("Users");

export const sendNotificationOnEmergencyRequest = functions.firestore
  .document('emergency_requests/{requestId}')
  .onCreate(async (snapshot) => {

    const activeMedics = await getActiveMedics();

    const tokens = activeMedics.map((medic) => medic.fcmToken);

    const payload: admin.messaging.MessagingPayload = {
      notification: {
        title: 'Nova emergência!',
        body: 'Uma nova emergência foi criada!',
      },
    };

    try {
      await admin.messaging().sendToDevice(tokens, payload);
      console.log('Notification sent successfully.');
    } catch (error) {
      console.error('Error sending FCM notification:', error);
    }
  });

async function getActiveMedics(): Promise<any[]> {
  try {
    const medicsSnapshot = await admin.firestore().collection('medics').where('isActive', '==', true).get();
    const activeMedics = medicsSnapshot.docs.map((doc) => doc.data());
    return activeMedics;
  } catch (error) {
    console.error('Error retrieving active medics:', error);
    throw error;
  }
}


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

