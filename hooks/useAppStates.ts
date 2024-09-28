import { useContext } from "react";
import { AppContext } from "@/context/Sidebar.context";

export const useAppStates = () => {
  const context = useContext(AppContext);
  return context;
};
