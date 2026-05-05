import React, { useEffect } from 'react';
import DataPage from './DataPage';

function Leaderboard() {
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`;

  useEffect(() => {
    console.log('[Leaderboard] REST API endpoint:', endpoint);
  }, [endpoint]);

  return <DataPage title="Leaderboard" endpointPath="leaderboard" endpoint={endpoint} />;
}

export default Leaderboard;
