import { format } from "@formkit/tempo";
import { useState } from "react";

export const useDateCurrent = () => {
  const [dateCurrent, setDateCurrent] = useState<string | Date>("");
  const l = "en";
  const t = new Date();
  setDateCurrent(format(t, "M/D/YYYY", l));
  return { dateCurrent };
};
