import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  Query,
  QueryConstraint,
} from "firebase/firestore";
import { db } from "./firebase";
import { Tour } from "@/types";

const TOURS_COLLECTION = "tours";

export async function saveTourToFirestore(userId: string, tour: Tour) {
  try {
    const tourRef = doc(db, TOURS_COLLECTION, `${userId}_${tour.id}`);
    await setDoc(tourRef, {
      ...tour,
      userId,
      createdAt: tour.createdAt || new Date(),
      updatedAt: new Date(),
    });
    return true;
  } catch (error) {
    console.error("Error saving tour:", error);
    throw error;
  }
}

export async function getUserTours(userId: string): Promise<Tour[]> {
  try {
    const q = query(
      collection(db, TOURS_COLLECTION),
      where("userId", "==", userId)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id.split("_")[1], // Extract tour ID
    } as Tour));
  } catch (error) {
    console.error("Error fetching tours:", error);
    return [];
  }
}

export async function getTourById(userId: string, tourId: string): Promise<Tour | null> {
  try {
    const tourRef = doc(db, TOURS_COLLECTION, `${userId}_${tourId}`);
    const docSnap = await getDoc(tourRef);
    if (docSnap.exists()) {
      return {
        ...docSnap.data(),
        id: tourId,
      } as Tour;
    }
    return null;
  } catch (error) {
    console.error("Error fetching tour:", error);
    return null;
  }
}

export async function deleteTourFromFirestore(userId: string, tourId: string) {
  try {
    const tourRef = doc(db, TOURS_COLLECTION, `${userId}_${tourId}`);
    await deleteDoc(tourRef);
    return true;
  } catch (error) {
    console.error("Error deleting tour:", error);
    throw error;
  }
}

export async function updateTourInFirestore(userId: string, tour: Tour) {
  try {
    const tourRef = doc(db, TOURS_COLLECTION, `${userId}_${tour.id}`);
    await updateDoc(tourRef, {
      ...tour,
      updatedAt: new Date(),
    });
    return true;
  } catch (error) {
    console.error("Error updating tour:", error);
    throw error;
  }
}
