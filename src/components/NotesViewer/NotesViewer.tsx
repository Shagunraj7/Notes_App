import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import NoteDetails from "./NoteDetails/NoteDetails";
import { NoteData } from "../../api.types";
import { useDebounce } from "../../hooks/use-debounce-value";

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

  const debouncedNote = useDebounce(noteData, 400);

  const saveNote = useCallback(async () => {
    if (!debouncedNote) {
      setNoteData(initialData);
      return;
    }
    const arr = {
      folderId: noteData.folderId,
      title: noteData.title,
      content: noteData.content,
      isFavorite: noteData.isFavorite,
      isArchived: noteData.isArchived,
    };

    await AxiosApi.patch(`/notes/${noteId}`, arr);

    if (noteData.folderId && folderId && noteData.folderId !== folderId) {
      setFolderChange(false);
      navigate(`/folders/${noteData.folderId}/notes/${noteId}`);
    }
  }, [
    debouncedNote,
    folderId,
    navigate,
    noteData.content,
    noteData.folderId,
    noteData.isArchived,
    noteData.isFavorite,
    noteData.title,
    noteId,
  ]);

  useEffect(() => {
    saveNote();
  }, [saveNote]);

  useEffect(() => {
    const fetchNote = async () => {
      if (!noteId || noteId === "newNote") {
        setNoteData(initialData);
        return;
      }
      try {
        const response = await AxiosApi.get(`/notes/${noteId}`);
        setNoteData(response.data.note);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    };

    fetchNote();
  }, [navigate, noteId]);

  const handleDataChange = useCallback(
    (
      event:
        | React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
          >
        | React.MouseEvent<HTMLButtonElement>
    ) => {
      const target = event.target as
        | HTMLInputElement
        | HTMLTextAreaElement
        | HTMLSelectElement;
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
    },
    []
  );

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

<NotesViewer />;
