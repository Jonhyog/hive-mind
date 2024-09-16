import { useEffect, useState } from "react";
import { onValue, ref } from "firebase/database";

import db from "@/utils/firebase";

const useGetRealtime = (path: string) => {
  const [realtimeData, setRealtimeData] = useState({});
  

  useEffect(() => {
    const dataRef = ref(db, path);

    onValue(dataRef, (snapshot) => {
      const data = snapshot.val();

      console.log(`Firebase path=${path} updated to `, data);
      setRealtimeData(data);
    });
  }, [path]);

  return realtimeData;
};

export default useGetRealtime;
