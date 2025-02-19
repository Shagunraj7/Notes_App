import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Folder, FolderContextType } from "../utils/interfaces";

const AxiosApi = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

const FolderContext = createContext<FolderContextType | undefined>(undefined);

export const FolderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [folderName, setActiveFolderName] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchFolders = () => {
    setIsLoading(true);
    AxiosApi.get("/folders")
      .then((res) => {
        const fetchedFolders: Folder[] = res.data.folders;
        setFolders(fetchedFolders);
        if (!activeFolder && fetchedFolders.length > 0) {
          setActiveFolder(fetchedFolders[0].id);
          setActiveFolderName(fetchedFolders[0].name);
        }
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  return (
    <FolderContext.Provider
      value={{
        folders,
        activeFolder,
        setActiveFolder,
        folderName,
        setActiveFolderName,
        fetchFolders,
        isLoading,
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export const useFolderContext = () => {
  const context = useContext(FolderContext);
  if (!context) {
    throw new Error("useFolderContext must be used within a FolderProvider");
  }
  return context;
};
