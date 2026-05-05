import React, { useEffect } from 'react';
import DataPage from './DataPage';

function Workouts() {
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    console.log('[Workouts] REST API endpoint:', endpoint);
  }, [endpoint]);

  return <DataPage title="Workouts" endpointPath="workouts" endpoint={endpoint} />;
}

export default Workouts;
