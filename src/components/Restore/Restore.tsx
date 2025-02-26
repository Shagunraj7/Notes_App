import { useNavigate , useParams } from "react-router-dom";
import restore from "../../assets/restore.svg"
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from 'react-toastify';

const AxiosApi = axios.create({ baseURL:'https://nowted-server.remotestate.com' });

function Restore() {
  const {noteId} = useParams();
  const navigate = useNavigate();
  const [noteName , setNoteName] = useState<string>("");
  const restoreNote = useCallback(() => {
    AxiosApi.post(`/notes/${noteId}/restore`);
    toast.success('Note Restored');
    navigate("/trash");
  },[navigate, noteId]);
  
  useEffect(() => {
    async function fetchNote() {
      const res = await AxiosApi.get(`/notes/${noteId}`);
      setNoteName(res.data.note.title);
    }
    fetchNote();
  },[noteId]);
  return (
    <>
    {<div className="flex justify-center items-center h-screen w-full flex-col gap-4">
      <img src={restore} alt="" />
      <p className="text-3xl">Restore {noteName}</p>
      <p className="text-md text-center text-dark-5">
      Don't want to lose this note? It's not too late! Just click the 'Restore'<br/> button and it will be added back to your list. It's that simple.
      </p>
      <button type="submit" className="bg-[#e50914] p-3 pl-7 pr-7 rounded hover:bg-red-700" onClick={restoreNote}>Restore</button>
    </div>}
    </>
  )
}

export default Restore;
