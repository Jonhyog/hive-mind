import { useEffect, useState } from "react";

const useGetHives = () => {
  const [hives, setHives] = useState([]);

  useEffect(() => {
    const url = "http://localhost:3003/hive";
    const getHives = async () => {
      try {
        const response = await fetch(url);
        const result = await response.json();

        setHives(result);
      } catch (error) {
        console.log("Failed to fetch hive data: ", error);
      }
    };

    getHives();
    const interval = setInterval(getHives, 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return hives;
};

export default useGetHives;
