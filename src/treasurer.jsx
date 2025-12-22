import { useEffect, useState } from "react";
import axios from "axios";

const API = process.env.REACT_APP_API_URL;  // <--- use environment variable

export default function Treasurer() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    axios.get(`${API}/api/expenses`)  // <--- updated
      .then(r => setClaims(r.data));
  }, []);

  return (
    <div>
      <h2>Pending Claims</h2>
      {claims.map(c =>
        <div key={c.id}>
          {c.fullName} - ${c.amount} - {c.status}
        </div>
      )}
    </div>
  );
}