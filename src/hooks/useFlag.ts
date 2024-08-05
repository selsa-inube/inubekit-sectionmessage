import { useContext } from "react";
import { FlagContext } from "../providers/FlagsProvider";

const useFlag = () => {
  const context = useContext(FlagContext);
  if (context === undefined) {
    throw new Error("useFlag must be used within a FlagProvider");
  }
  return context;
};

export { useFlag };
