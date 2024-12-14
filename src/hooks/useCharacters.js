import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function useCharacters(value) {
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function fetchData() {
      try {
        setIsloading(true);
        const res = await axios.get(
          `https://rickandmortyapi.com/api/character?name=${value}`,
          { signal }
        );
        setCharacters(res.data.results.slice(0, 5));
        return () => {};
      } catch (error) {
        setCharacters([]);
        toast.error(error.response.data.error);
      } finally {
        setIsloading(false);
      }
    }

    if (value.length < 3) {
      setCharacters([]);
      return;
    }
    fetchData();

    return () => {
      controller.abort();
    };
  }, [value]);

  return { isLoading, characters };
}
