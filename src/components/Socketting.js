// client/src/components/Socketting.js

import { getBackendUrl } from '../EnvironmentVariables';

const setClerkSocket = async (socketId) => {
  const token = localStorage.getItem("auth");
  if (token) {
    try {
      const response = await fetch(getBackendUrl() + '/user/set-clerksocket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          socketId: socketId
        })
      });
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error occurred while updating socket id:', error.message);
      return false;
    }
  }
  return false;
};

const Socketting = {
  setClerkSocket: setClerkSocket
};

export default Socketting;
