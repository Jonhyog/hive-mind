import { createContext, useEffect, useState } from "react";

type HiveContextAPI = {
  hive: string;
  setHiveContext: (value: string) => void;
};

const HiveContext = createContext<HiveContextAPI | undefined>(undefined);

const HiveProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [hive, setHive] = useState("");
  const data: HiveContextAPI = {
    hive: hive,
    setHiveContext: setHive,
  };

  useEffect(() => {
    const setFirstHive = async () => {
      const url = "http://localhost:3003/hive";
      try {
        const response = await fetch(url);
        const result = await response.json();
    
        if (result.length > 0) {
          setHive(result[0].hiveId);
          return
        }
    
      } catch (error) {
        console.log("Failed to fetch hive data while setting initial context: ", error);
      }
    };

    setFirstHive();
  }, []);

  useEffect(() => {
    console.log("Hive context changed to: ", hive);
  }, [hive]);

  return <HiveContext.Provider value={data}>{children}</HiveContext.Provider>;
};

export { HiveProvider, HiveContext };
