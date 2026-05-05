import React, { useEffect } from 'react';
import DataPage from './DataPage';

function Users() {
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    console.log('[Users] REST API endpoint:', endpoint);
  }, [endpoint]);

  return <DataPage title="Users" endpointPath="users" endpoint={endpoint} />;
}

export default Users;
