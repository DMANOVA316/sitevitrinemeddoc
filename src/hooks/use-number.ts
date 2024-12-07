import { useNumberContext } from "@/contexts/NumberContext";

export const useNumber = () => {
  const context = useNumberContext();
  return context;
};
