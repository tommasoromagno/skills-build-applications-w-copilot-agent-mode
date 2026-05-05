import React, { useEffect, useMemo, useState } from 'react';
import DataTable from './DataTable';

const BASE_API_URL = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api`;

function DataPage({ title, endpointPath, endpoint: endpointOverride }) {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const endpoint = endpointOverride || `${BASE_API_URL}/${endpointPath}/`;

  useEffect(() => {
    console.log(`[${title}] REST API endpoint:`, endpoint);

    fetch(endpoint)
      .then((response) => response.json())
      .then((json) => {
        console.log(`[${title}] fetched data:`, json);
        const items = Array.isArray(json)
          ? json
          : json && Array.isArray(json.results)
          ? json.results
          : [];
        setData(items);
      })
      .catch((err) => {
        console.error(`[${title}] fetch error:`, err);
        setError(err);
      });
  }, [endpoint, title]);

  const filteredData = useMemo(() => {
    if (!query.trim()) {
      return data;
    }

    const normalizedQuery = query.toLowerCase();
    return data.filter((item) =>
      Object.values(item || {}).some((value) => {
        const text = value && typeof value === 'object' ? JSON.stringify(value) : String(value);
        return text.toLowerCase().includes(normalizedQuery);
      })
    );
  }, [data, query]);

  return (
    <div className="container py-4">
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
            <div>
              <h2 className="card-title mb-1">{title}</h2>
              <p className="text-muted mb-0">
                Browse the latest {title.toLowerCase()} with a clean Bootstrap table layout.
              </p>
            </div>
            <form className="row gx-2 gy-2 align-items-center" onSubmit={(event) => event.preventDefault()}>
              <div className="col-auto">
                <label className="visually-hidden" htmlFor={`${endpointPath}-search`}>
                  Search
                </label>
                <input
                  id={`${endpointPath}-search`}
                  type="search"
                  className="form-control"
                  placeholder="Search entries"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setQuery('')}
                >
                  Clear
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {error && <div className="alert alert-danger">Unable to load {title.toLowerCase()}.</div>}

      {filteredData.length === 0 ? (
        <div className="card border-info shadow-sm">
          <div className="card-body">
            <h5 className="card-title">No results found</h5>
            <p className="card-text">
              Try adjusting your search or check back when more {title.toLowerCase()} are available.
            </p>
          </div>
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body p-0">
            <DataTable data={filteredData} />
          </div>
        </div>
      )}
    </div>
  );
}

export default DataPage;
