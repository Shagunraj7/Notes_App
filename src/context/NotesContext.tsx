import { createContext, useContext, useState } from "react";
import axios from "axios";

const AxiosApi = axios.create({ baseURL:'https://nowted-server.remotestate.com' });
const NotesContext = createContext<any>(null);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNotes = async ({
    folderId = "",
    page = 1,
    archived = "false",
    favorite = "false",
    deleted = "false",
  }) => {
    setLoading(true);
    try {
      const response = await AxiosApi.get(`/notes`, {
        params: {
          archived,
          favorite,
          deleted,
          folderId,
          page,
          limit: 10,
        },
      });
      setNotes(response.data.notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <NotesContext.Provider value={{ notes, setNotes, fetchNotes, loading }}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}
