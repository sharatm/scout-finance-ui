import axios from "axios";
import { useState } from "react";

export default function ExpenseForm() {
  const [form, setForm] = useState({});

  const submit = async () => {
    await axios.post("http://localhost:8080/api/expenses", form);
    alert("Submitted");
  };

  return (
    <div>
      <h2>Troop 2605 Expense Claim</h2>

      <input placeholder="Full Name"
        onChange={e => setForm({...form, fullName: e.target.value})} />

      <input placeholder="Event Name"
        onChange={e => setForm({...form, eventName: e.target.value})} />

      <input type="date"
        onChange={e => setForm({...form, shoppingDate: e.target.value})} />

      <input placeholder="Stores"
        onChange={e => setForm({...form, storeNames: e.target.value})} />

      <input placeholder="Amount"
        onChange={e => setForm({...form, amount: e.target.value})} />

      <button onClick={submit}>Submit</button>
    </div>
  );
}
