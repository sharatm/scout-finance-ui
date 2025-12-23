import React, { useState } from "react";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

function App() {
  const [form, setForm] = useState({
    fullName: "",
    eventName: "",
    storeNames: "",
    amount: "",
    description: "",
    email: "",
    shoppingDate: "",
    zelleContact: "",
    zelleName: ""
  });

  const [expenses, setExpenses] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // success | error

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitExpense = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${API_URL}/api/expenses`, form);

      // Add new expense to table
      setExpenses((prev) => [...prev, res.data]);

      // Success message
      setMessage("Expense submitted successfully!");
      setMessageType("success");

      // Reset form
      setForm({
        fullName: "",
        eventName: "",
        storeNames: "",
        amount: "",
        description: "",
        email: "",
        shoppingDate: "",
        zelleContact: "",
        zelleName: ""
      });
    } catch (err) {
      console.error(err);
      setMessage("Failed to submit expense");
      setMessageType("error");
    }

    // Auto-hide message after 3 seconds
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "auto" }}>
      <h2>Troop 2605 – Expense Submission</h2>

      {/* Message */}
      {message && (
        <div
          style={{
            marginBottom: "15px",
            padding: "10px",
            color: messageType === "success" ? "#155724" : "#721c24",
            backgroundColor: messageType === "success" ? "#d4edda" : "#f8d7da",
            border: "1px solid",
            borderColor: messageType === "success" ? "#c3e6cb" : "#f5c6cb"
          }}
        >
          {message}
        </div>
      )}

      <form onSubmit={submitExpense} style={{ marginBottom: "30px" }}>
        {[
          { name: "fullName", placeholder: "Full Name", required: true },
          { name: "eventName", placeholder: "Event / Camp Name", required: true },
          { name: "storeNames", placeholder: "Store Names (comma-separated)", required: true },
          { name: "amount", placeholder: "Amount", type: "number", step: "0.01", required: true },
          { name: "description", placeholder: "Description" },
          { name: "email", placeholder: "Email", type: "email" },
          { name: "shoppingDate", placeholder: "Shopping Date", type: "date" },
          { name: "zelleName", placeholder: "Zelle Name" },
          { name: "zelleContact", placeholder: "Zelle Contact" }
        ].map((field) => (
          <div key={field.name} style={{ marginBottom: "10px" }}>
            <input
              name={field.name}
              placeholder={field.placeholder}
              type={field.type || "text"}
              step={field.step}
              value={form[field.name]}
              onChange={handleChange}
              required={field.required || false}
              style={{ width: "100%", padding: "6px" }}
            />
          </div>
        ))}

        <button type="submit" style={{ padding: "10px 20px" }}>
          Submit Expense
        </button>
      </form>

      <h3>Submitted Expenses</h3>
      {expenses.length === 0 ? (
        <p>No expenses submitted yet.</p>
      ) : (
        <table border="1" cellPadding="6" style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              {Object.keys(expenses[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, index) => (
              <tr key={index}>
                {Object.keys(exp).map((key) => (
                  <td key={key}>{exp[key] ?? "-"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
