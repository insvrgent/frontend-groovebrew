import { getBackendUrl } from '../EnvironmentVariables';

const checkToken = async () => {
  const token = localStorage.getItem("auth");
  if (token) {
    try {
      const response = await fetch(getBackendUrl() + '/user/check-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        const responseData = await response.json();
        
        return {ok: true, user: responseData};
      } else {
        localStorage.removeItem("auth");
        return {ok: false};
      }
    } catch (error) {
      console.error('Error occurred while verifying token:', error.message);
      localStorage.removeItem("auth");
      return {ok: false};
    }
  }
  return {ok: false};
};

export default checkToken;
