import React, { useEffect, useState } from "react";
import "./Analytics.css";

export default function Analytics() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const backendURL = "http://localhost:3000";

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch(`${backendURL}/shortURL/getAllAnalytics`);
        if (!res.ok) throw new Error("Failed to fetch analytics data");
        const data = await res.json();
        console.log("Response: ", data);

        setHistory(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchHistory();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const handleDelete = async (shortURL) => {
    try {
      const res = await fetch(`${backendURL}/shortURL/deleteURL`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shortURL }),
      });

      console.log(res);

      if (!res.ok) throw new Error("Failed to delete");

      setHistory((prev) => prev.filter((h) => h.shortURL !== shortURL));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="analytics-container">
      <h1>URL Analytics</h1>
      {history.length === 0 ? (
        <p>No URL data available.</p>
      ) : (
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>Original URL</th>
              <th>Short URL</th>
              <th>Created At</th>
              <th>Visited Count</th>
              <th>Last Visited</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item) => (
              <tr key={item._id}>
                <td>
                  <a href={item.originalURL} target="_blank" rel="noreferrer">
                    {item.originalURL}
                  </a>
                </td>
                <td>
                  <a
                    href={`http://localhost:3000/shortURL/${item.shortURL}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.shortURL}
                  </a>
                </td>
                <td>{new Date(item.createdAt).toLocaleString()}</td>
                <td>{item.visited.length}</td>
                <td>
                  {item.visited.length > 0
                    ? new Date(
                        item.visited[item.visited.length - 1]
                      ).toLocaleString()
                    : "Never"}
                </td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(item.shortURL)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
