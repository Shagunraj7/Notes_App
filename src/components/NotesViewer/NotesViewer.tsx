import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import NoteDetails from "./NoteDetails/NoteDetails";
import getDate from "../../context/getDate";
import debounce from "lodash.debounce";

const AxiosApi = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

function NotesViewer() {
  const [noteData, setNoteData] = useState({});
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const { noteId, folderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!noteId || noteId === "newNote") {
      setNoteData({});
      return;
    }
    AxiosApi.get(`/notes/${noteId}`)
      .then((res) => setNoteData(res.data.note))
      .catch((err) => {
        toast.error("Invalid Path");
        navigate("/");
      });
  }, [noteId]);

  const saveNote = useCallback(
    debounce(async () => {
      const arr = {
        folderId,
        title: noteData.title,
        content: noteData.content,
        isFavorite: false,
        isArchived: false,
      };
      AxiosApi.patch(`/notes/${noteId}`, arr);
    }, 500),
    [noteData, noteId, folderId]
  );

  function handleDataChange(event) {
    const { name, value } = event.target;
    setNoteData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    saveNote();
  }

  return (
    <div className="w-full p-12">
      <NoteDetails
        noteData={noteData}
        handleDataChange={handleDataChange}
        getDate={getDate}
      />
      <div className="pt-5">
        <textarea
          className="w-full focus:outline-none"
          rows={28}
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
