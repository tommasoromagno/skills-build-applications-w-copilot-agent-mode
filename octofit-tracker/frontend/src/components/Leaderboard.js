import React, { useEffect, useState } from 'react';

const BASE_API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;

function Leaderboard() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const endpoint = `${BASE_API_URL}/leaderboard/`;

  useEffect(() => {
    console.log('[Leaderboard] REST API endpoint:', endpoint);

    fetch(endpoint)
      .then((response) => response.json())
      .then((json) => {
        console.log('[Leaderboard] fetched data:', json);
        const items = Array.isArray(json) ? json : (json && Array.isArray(json.results) ? json.results : []);
        setData(items);
      })
      .catch((err) => {
        console.error('[Leaderboard] fetch error:', err);
        setError(err);
      });
  }, [endpoint]);

  return (
    <div className="container py-4">
      <h2>Leaderboard</h2>
      {error && <div className="alert alert-danger">Error loading leaderboard.</div>}
      {data.length === 0 ? (
        <p>No leaderboard entries available.</p>
      ) : (
        <ul className="list-group">
          {data.map((item, index) => (
            <li className="list-group-item" key={item.id ?? item.rank ?? index}>
              <pre className="mb-0">{JSON.stringify(item, null, 2)}</pre>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Leaderboard;
