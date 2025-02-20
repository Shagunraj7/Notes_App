import axios, { isAxiosError } from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Folder, FolderContextType } from "../api.types";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const AxiosApi = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

const FolderContext = createContext<FolderContextType | undefined>(undefined);

export const FolderProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { folderId } = useParams();
  const [folders, setFolders] = useState<Folder[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  

  const fetchFolders = useCallback(async () => {
    try {
      setIsLoading(true);
      const { data } = await AxiosApi.get<{ folders: Folder[] }>("/folders");
      setFolders(data.folders);
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error("somthing went wrong!");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (folders.length) return;
    fetchFolders();
  }, [fetchFolders, folders.length]);

  const activeFolder = useMemo(() => {
    return folders.find((item) => item.id == folderId) ?? null;
  }, [folderId, folders]);
  
  return (
    <FolderContext.Provider
      value={{
        folders,
        activeFolder,
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
