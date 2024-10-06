import { useState } from "react";

export const useSearch = <T>() => {
  const [search, setSearch] = useState<string>("");
  const [dataProcesing, setDataProcesing] = useState<T[]>([]);

  const filteredData = dataProcesing.filter((item) =>
    JSON.stringify(item).toLowerCase().includes(search.toLowerCase())
  );

  return {
    search,
    setSearch,
    setDataProcesing,
    filteredData,
  };
};
