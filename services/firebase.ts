import { db } from "@/firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

export const updateSearchCount = async (queryStr: string, movie: Movie) => {
  try {

    const q = query(collection(db, "searches"), where("searchTerm", "==", queryStr));
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const existingDoc = snapshot.docs[0];
      await updateDoc(doc(db, "searches", existingDoc.id), {
        count: existingDoc.data().count + 1,
      });
    } else {
      await addDoc(collection(db, "searches"), {
        searchTerm: queryStr,
        movie_id: movie.id,
        title: movie.title,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }
  } catch (error) {
    console.error("🔥 Firebase error:", error);
  }
};
