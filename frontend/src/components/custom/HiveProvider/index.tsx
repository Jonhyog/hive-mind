import { createContext, useEffect, useState } from "react";

type HiveContextAPI = {
    hive: string;
    setHiveContext: ((value: string) => void);
}

const HiveContext = createContext<HiveContextAPI | undefined>(undefined);

const HiveProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [hive, setHive] = useState("");
  const data: HiveContextAPI = {
    hive: hive,
    setHiveContext: setHive
  };

  useEffect(() => {
    console.log("Hive context changed to: ", hive);
  }, [hive]);

  return <HiveContext.Provider value={data}>{children}</HiveContext.Provider>;
};

export { HiveProvider, HiveContext };