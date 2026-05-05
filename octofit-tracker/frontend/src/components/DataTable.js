import React, { useMemo, useState } from 'react';

function getHeaders(data) {
  const headers = new Set();
  data.forEach((item) => {
    if (item && typeof item === 'object' && !Array.isArray(item)) {
      Object.keys(item).forEach((key) => headers.add(key));
    }
  });
  return Array.from(headers);
}

function renderCell(value) {
  if (value === null || value === undefined) {
    return <span className="text-muted">—</span>;
  }

  if (Array.isArray(value) || typeof value === 'object') {
    return <pre className="mb-0 small text-wrap">{JSON.stringify(value, null, 2)}</pre>;
  }

  return String(value);
}

function DataTable({ data }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const headers = useMemo(() => getHeaders(data), [data]);

  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  return (
    <>
      <div className="table-responsive shadow-sm rounded overflow-hidden">
        <table className="table table-hover table-bordered align-middle mb-0">
          <thead className="table-dark">
            <tr>
              {headers.map((header) => (
                <th key={header} scope="col">
                  {header.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())}
                </th>
              ))}
              <th scope="col" className="text-end">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.id ?? item.slug ?? item.name ?? item.username ?? `row-${index}`}>
                {headers.map((header) => (
                  <td key={`${header}-${index}`}>{renderCell(item?.[header])}</td>
                ))}
                <td className="text-end">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={() => setSelectedItem(item)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedItem && (
        <>
          <div className="modal-backdrop fade show" />
          <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true">
            <div className="modal-dialog modal-dialog-scrollable modal-lg" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Details</h5>
                  <button
                    type="button"
                    className="btn-close"
                    aria-label="Close"
                    onClick={() => setSelectedItem(null)}
                  />
                </div>
                <div className="modal-body">
                  <pre className="mb-0">{JSON.stringify(selectedItem, null, 2)}</pre>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setSelectedItem(null)}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default DataTable;
