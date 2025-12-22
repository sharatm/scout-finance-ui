import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [form, setForm] = useState({
    fullName: "",
    eventName: "",
    storeName: "",
    amount: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitExpense = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/expenses`, form);
      alert("Expense submitted successfully");
      setForm({ fullName: "", eventName: "", storeName: "", amount: "" });
    } catch (err) {
      alert("Failed to submit expense");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "500px", margin: "auto" }}>
      <h2>Troop 2605 – Expense Submission</h2>

      <form onSubmit={submitExpense}>
        <input name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} required />
        <br /><br />

        <input name="eventName" placeholder="Event / Camp Name" value={form.eventName} onChange={handleChange} required />
        <br /><br />

        <input name="storeName" placeholder="Store Name" value={form.storeName} onChange={handleChange} required />
        <br /><br />

        <input name="amount" type="number" step="0.01" placeholder="Amount" value={form.amount} onChange={handleChange} required />
        <br /><br />

        <button type="submit">Submit Expense</button>
      </form>
    </div>
  );
}

export default App;
