// src/context/FilterContext.jsx
import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const useFilters = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    storeId: null,
    startDate: "2005-01-01",
    endDate: "2006-12-31",
  });

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilter }}>
      {children}
    </FilterContext.Provider>
  );
};
