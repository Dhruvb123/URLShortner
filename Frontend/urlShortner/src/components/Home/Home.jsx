import React, { useState } from "react";
import "./Home.css";

export default function Home() {
  const [originalURL, setOriginalURL] = useState("");
  const [shortURL, setShortURL] = useState("");
  const [error, setError] = useState(null);

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setShortURL("");

    try {
      const res = await fetch(`${backendURL}/shortURL`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: originalURL }),
      });

      if (!res.ok) throw new Error("Failed to create short URL");

      const data = await res.json();
      console.log(data);
      setShortURL(data.shortURL);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <h1>Create Short URL</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="url"
          placeholder="Enter URL"
          value={originalURL}
          onChange={(e) => setOriginalURL(e.target.value)}
          required
        />
        <button type="submit">Shorten</button>
      </form>
      <div className="result-container">
        {shortURL && (
          <p>
            Short URL:{" "}
            <a
              href={`http://localhost:3000/shortURL/${shortURL}`}
              target="_blank"
              rel="noreferrer"
            >
              http://localhost:3000/shortURL/{shortURL}
            </a>
          </p>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </>
  );
}
