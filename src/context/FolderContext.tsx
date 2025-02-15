import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

interface Folder {
  id: string;
  name: string;
}

const AxiosApi = axios.create({ baseURL: 'https://nowted-server.remotestate.com' });

interface FolderContextType {
  folders: Folder[];
  activeFolder: string | null;
  setActiveFolder: (id: string) => void;
  folderName: string | undefined;
  setActiveFolderName: (name: string) => void;
  fetchFolders: () => void;
  isLoading: boolean;
}

const FolderContext = createContext<FolderContextType | undefined>(undefined);

export const FolderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [folderName, setActiveFolderName] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchFolders = () => {
    setIsLoading(true);
    AxiosApi
      .get("/folders")
      .then((res) => {
        const fetchedFolders = res.data.folders;
        setFolders(fetchedFolders);
        if (!activeFolder) {
          setActiveFolder(fetchedFolders[0].id);
          setActiveFolderName(fetchedFolders[0].name); // Set the folder name when setting the active folder
        }
      })
      .catch((err) => console.error(err))
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
        isLoading 
      }}
    >
      {children}
    </FolderContext.Provider>
  );
};

export const useFolderContext = () => {
  const context = useContext(FolderContext);
  return context;
};