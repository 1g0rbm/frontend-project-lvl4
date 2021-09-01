import { useCallback, useState } from 'react';
import axios from 'axios';

export default () => {
  const [httpError, setHttpError] = useState(null);

  const request = useCallback(async (url, method = 'GET', data = null, headers = {}) => {
    try {
      const response = await axios.request({
        url,
        method,
        headers,
        data,
      });

      return response.data;
    } catch (e) {
      setHttpError(e.message);
      throw e;
    }
  }, []);

  const clearHttpError = () => setHttpError(null);

  return { request, clearHttpError, httpError };
};
