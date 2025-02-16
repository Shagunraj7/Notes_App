import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AxiosApi = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});
const NotesContext = createContext<any>(null);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchNotes = async ({
    folderId = "",
    page = 1,
    archived = "false",
    favorite = "false",
    deleted = "false",
  }) => {
    setLoading(true);
    AxiosApi.get(`/notes`, {
      params: {
        archived,
        favorite,
        deleted,
        folderId,
        page,
        limit: 10,
      },
    })
    .then((response) => setNotes(response.data.notes))
    .then((res) => setLoading(false))
    .catch((err) => navigate('/'));
  };

  return (
    <NotesContext.Provider value={{ notes, setNotes, fetchNotes, isLoading , setLoading}}>
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  return useContext(NotesContext);
}
