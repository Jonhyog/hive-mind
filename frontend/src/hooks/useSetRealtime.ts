import { ref, set } from "firebase/database";

import db from "@/utils/firebase";
import { useCallback } from "react";

const useSetRealtime = (path: string) => {
  const dataRef = ref(db, path);

  const handleSetData = useCallback((data) => {
    console.log(`Firebase set path=${path} to`, data);
    set(dataRef, data);
  }, [dataRef, path]);

  return handleSetData;
};

export default useSetRealtime;