import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
//import firebase tools

const firebaseConfig = {
  apiKey: "AIzaSyCvuuReGKCbRLQAyo9RwFScU0INxCT3SlM",
  authDomain: "safepath-e508d.firebaseapp.com",
  projectId: "safepath-e508d",
}; // firebaseConfig object

const app = initializeApp(firebaseConfig); //initialize firebase
const db = getFirestore(app); //connect to firestore  database

export async function saveRating(zoneId, score) {
// to save data
  await addDoc(collection(db, "ratings"), {

    zoneId: zoneId,
    score: score, // actual data ie saved
    timestamp: Date.now()

  });

  console.log("Rating saved"); //just for debugging

}

//func to retrieves all ratings from database
export async function fetchRatings() {

  const querySnapshot = await getDocs(collection(db, "ratings")); //fetches data

  let ratings = []; //empty list to store retrieved data

  querySnapshot.forEach((doc) => {

    ratings.push(doc.data());

  });

  console.log("Ratings fetched:", ratings);

  return ratings;

}