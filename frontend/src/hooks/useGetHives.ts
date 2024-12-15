import baseRoute from "@/utils/api";
import { useEffect, useState } from "react";

type GetHivesVariables = {
  hiveId?: string;
  location?: string;
  description?: string;
};

type GetHivesResponse = {
  _id: string;
  hiveId: string;
  location: string;
  description?: string;
  __v: number;
};

const useGetHives = (vars: GetHivesVariables) => {
  const [hives, setHives] = useState<GetHivesResponse[]>([]);

  useEffect(() => {
    console.log(baseRoute)
    const url = new URL(`${baseRoute}/hive`);
    const getHives = async () => {
      const filteredEntries = Object.fromEntries(
        Object.entries(vars ?? {}).filter(
          ([, value]) => value != null && value !== ""
        )
      );

      Object.entries(filteredEntries).forEach(([key, value]) => {
        url.searchParams.append(key, value)
      }
      );

      try {
        const response = await fetch(url);
        const result = await response.json();

        setHives(result);
      } catch (error) {
        console.log("Failed to fetch hive data: ", error);
      }
    };

    getHives();
  }, [vars]);

  return hives;
};

export default useGetHives;
