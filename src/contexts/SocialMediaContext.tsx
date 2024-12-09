import useSocialMedia from "@/hooks/use-social-media";
import { useSocialMediaProps } from "@/types";
import { createContext, ReactNode, useContext } from "react";

const SocialMediaContext = createContext<useSocialMediaProps | null>(null);

interface SocialMediaProviderProps {
  children: ReactNode;
}

export const SocialMediaProvider: React.FC<SocialMediaProviderProps> = ({
  children,
}) => {
  const value = useSocialMedia();
  return (
    <SocialMediaContext.Provider value={value}>
      {children}
    </SocialMediaContext.Provider>
  );
};

export const useSocialMediaContext = (): useSocialMediaProps => {
  const context = useContext(SocialMediaContext);
  if (!context) {
    throw new Error(
      "useSocialMediaContext must be used within a SocialMediaProvider"
    );
  }
  return context;
};
