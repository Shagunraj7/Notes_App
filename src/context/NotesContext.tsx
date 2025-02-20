import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from "react";
import axios, { isAxiosError } from "axios";
import { toast } from "react-toastify";
import { Note, NotesContextType, FetchNotesParams } from "../api.types";

const AxiosApi = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

const NotesContext = createContext<NotesContextType | null>(null);

export function NotesProvider({ children }: { children: ReactNode }) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);

  const fetchNotes = useCallback(
    async ({
      folderId = "",
      page = 1,
      archived = false,
      favorite = false,
      deleted = false,
      search = "",
    }: FetchNotesParams): Promise<void> => {
      setLoading(true);
      try {
        const response = await AxiosApi.get<{ notes: Note[] }>("/notes", {
          params: {
            archived,
            favorite,
            deleted,
            folderId,
            page,
            limit: 10,
            search,
          },
        });

        if (page === 1) {
          setNotes(response.data.notes);
        } else {
          setNotes((prevNotes) => [...prevNotes, ...response.data.notes]);
        }
      } catch (error) {
        if (isAxiosError(error)) {
          toast.error(error.response?.data.message);
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return (
    <NotesContext.Provider
      value={{ notes, setNotes, fetchNotes, isLoading, setLoading }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes(): NotesContextType {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}
