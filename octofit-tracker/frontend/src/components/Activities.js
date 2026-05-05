import React, { useEffect } from 'react';
import DataPage from './DataPage';

function Activities() {
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('[Activities] REST API endpoint:', endpoint);
  }, [endpoint]);

  return <DataPage title="Activities" endpointPath="activities" endpoint={endpoint} />;
}

export default Activities;
