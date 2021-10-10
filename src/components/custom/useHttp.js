import { useState, useCallback } from "react";
export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const makeRequest = useCallback(async (configuration, getData) => {
    try {
      setIsLoading(true);
      const response = await fetch(configuration.url, {
        method: configuration.method ? configuration.method : "GET",
        body: configuration.body ? configuration.body : null,
        headers: configuration.headers ? configuration.headers : {},
      });
      if (!response.ok) {
        throw new Error("Request error");
      }

      getData(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setError(error);
    }
  }, []);
  return { isLoading, error, makeRequest };
};
