import React, { useEffect } from 'react';
import DataPage from './DataPage';

function Teams() {
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/teams/`;

  useEffect(() => {
    console.log('[Teams] REST API endpoint:', endpoint);
  }, [endpoint]);

  return <DataPage title="Teams" endpointPath="teams" endpoint={endpoint} />;
}

export default Teams;
