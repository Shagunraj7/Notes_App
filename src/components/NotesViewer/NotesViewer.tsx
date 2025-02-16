import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import NoteDetails from "./NoteDetails/NoteDetails";

const AxiosApi = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

function NotesViewer() {
  const [noteData, setNoteData] = useState({});
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const { noteId, folderId } = useParams();
  const navigate = useNavigate();
  

  useEffect(() => {
    if (!noteId || noteId == "newNote") {
      setNoteData({});
      return;
    }
    AxiosApi.get(`/notes/${noteId}`)
      .then((res) => setNoteData(res.data.note))
      .catch((err) => {
        toast.error('Invalid Path');
        navigate("/")
      });
  }, [noteId]);


  function handleDataChange(event: any) {
    setNoteData({
      ...noteData,
      [event.target.name]: event.target.value,
    });
  }
  
  function saveNote(event: any) {
    event.preventDefault();
    setIsSubmitLoading(true);
    const arr = {
      folderId,
      title: noteData.title,
      content: noteData.content,
      isFavorite: false,
      isArchived: false,
    };
    if (noteId == "newNote") {
      AxiosApi.post(`/notes`, arr).then((res) => setIsSubmitLoading(false)).then(res => toast.success('Note Saved'));
    } else {
      AxiosApi.patch(`/notes/${noteId}`, arr).then((res) =>
        setIsSubmitLoading(false)
      ).then(res => toast.success('Note Saved'));
    }
  }
  return (
    <div className="w-full p-12 ">
        <NoteDetails noteData={noteData} handleDataChange={handleDataChange}/>
        <div className="pt-5">
          <textarea
            className="w-full focus:outline-none "
            rows={28}
            name="content"
            id="content"
            onChange={handleDataChange}
            value={noteData.content}
            placeholder="Write your Note"
          ></textarea>
        </div>
        <button
          type="submit"
          onClick={saveNote}
          className={`customRed p-3 w-full rounded transition-all duration-300 ${
            isSubmitLoading ? "opacity-70" : "hover:bg-red-700"
          }`}
          disabled={isSubmitLoading}
        >
          {isSubmitLoading ? "Saving..." : "Save Note"}
        </button>
    </div>
  );
}

export default NotesViewer;