import useGetHives from "@/hooks/useGetHives";
import { createContext, useEffect, useMemo, useState } from "react";

type HiveContextAPI = {
  hive?: string;
  setHiveContext?: (value: string) => void;
};

const HiveContext = createContext<HiveContextAPI>({});

const HiveProvider = ({ children }: { children: JSX.Element }): JSX.Element => {
  const [hive, setHive] = useState("");
  const data = useMemo(() => {
    return {
      hive: hive,
      setHiveContext: setHive,
    };
  }, [hive]);
  const vars = useMemo(() => ({}), []);
  const hivesData = useGetHives(vars);
  
  useEffect(() => {
    if (hivesData.length > 0) {
      setHive(hivesData[0].hiveId);
    }
  }, [hivesData]);

  useEffect(() => {
    console.log("Hive context changed to: ", hive);
  }, [hive]);

  return <HiveContext.Provider value={data}>{children}</HiveContext.Provider>;
};

export { HiveProvider, HiveContext };
