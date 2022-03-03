import { useCallback, useEffect, useState } from "react";
import { isEmpty } from 'lodash'

export const useLocalStorage = (key, data) => {
  const [storageData, setStorageData] = useState(JSON.stringify(data));
  useEffect(() => {
    console.log("initial")
    localStorage.setItem(key, storageData);
  }, []);
  
  useEffect(() => {
    localStorage.setItem(key, storageData);
  }, [storageData, key]);

  const getData = ()=>{
      const data = localStorage.getItem(key);
      if(isEmpty(data)){
          return null
      }
      return JSON.parse(data)
  }

  const setData = (data) =>{
      setStorageData(JSON.stringify(data))
  }

  return {getData, setData}
};
