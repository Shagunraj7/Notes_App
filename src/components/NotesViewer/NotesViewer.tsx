import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NoteDetails from "./NoteDetails/NoteDetails";
import debounce from "lodash.debounce";
import { NoteData } from "../../utils/interfaces";

const AxiosApi = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

const initialData = {
  id: "",
  folderId: "",
  title: "",
  content: "",
  isFavorite: false,
  isArchived: false,
  createdAt: "",
  updatedAt: "",
  deletedAt: "",
  folder: {
    id: "",
    name: "",
    createdAt: "",
    updatedAt: "",
    deletedAt: "",
  },
};

function NotesViewer() {
  const [noteData, setNoteData] = useState<NoteData>(initialData);
  const [folderChange, setFolderChange] = useState(false);
  const { noteId, folderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!noteId || noteId === "newNote") {
      setNoteData(initialData);
      return;
    }
    AxiosApi.get(`/notes/${noteId}`)
      .then((res) => setNoteData(res.data.note))
      .catch(() => {
        toast.error("Invalid Path");
        navigate("/");
      });
  }, [noteId]);

  const saveNote = useCallback(
    debounce(async () => {
      const arr = {
        folderId: noteData.folderId,
        title: noteData.title,
        content: noteData.content,
        isFavorite: noteData.isFavorite,
        isArchived: noteData.isArchived,
      };
      AxiosApi.patch(`/notes/${noteId}`, arr).then(() => {
        if (noteData.folderId && folderId && noteData.folderId !== folderId) {
          setFolderChange(false);
          navigate(`/folders/${noteData.folderId}/notes/${noteId}`);
        }
      });
    }, 500),
    [noteData, noteId, folderId]
  );
  useEffect(() => {
    saveNote();
  }, [noteData]);
  function handleDataChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement> | 
    React.MouseEvent<HTMLButtonElement>) {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
      const name = target.name;
    
      if (name === "isFavorite" || name === "isArchived") {
        setNoteData((prevData) => ({
          ...prevData,
          [name]: !prevData[name as keyof NoteData],
        }));
        return;
      }
    
      let value: string | undefined;
    
      if (name === "folderId" && "dataset" in event.currentTarget) {
        value = event.currentTarget.dataset.id;
      } else {
        value = target.value;
      }
    
      setNoteData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
  }

  return (
    <div className="w-full p-12">
      <NoteDetails
        noteData={noteData}
        handleDataChange={handleDataChange}
        folderChange={folderChange}
        setFolderChange={setFolderChange}
      />
      <div className="pt-5">
        <textarea
          className="w-full focus:outline-none"
          rows={32}
          name="content"
          id="content"
          onChange={handleDataChange}
          value={noteData.content || ""}
          placeholder="Write your Note"
        ></textarea>
      </div>
    </div>
  );
}

export default NotesViewer;
