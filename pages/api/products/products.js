import { db } from '../../../firebase';
import firebase from 'firebase';

const createCar = async (name) => {
    await db
    .collection('cars')
    .add({
        name,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
    .then(navigation.goBack())
    .catch((err) => alert(err.message));
};