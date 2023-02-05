import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortController = new AbortController();

    setTimeout(() => {
      fetch(url, { signal: abortController.signal })
        .then((res) => {
          if (!res.ok) {
            throw Error("Could not fetch data from resource");
          }
          return res.json();
        })
        .then((data) => {
          setIsLoading(false);
          setData(data);
          setError(null);
        })
        .catch((e) => {
          if (e.name === "AbortError") {
            console.log("Aborted");
          } else {
            setError(e.message);
            setIsLoading(false);
          }
        });
    }, 1000);
    return () => abortController.abort();
  }, [url]);
  return { data, isLoading, error };
}
