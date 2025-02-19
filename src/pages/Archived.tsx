import NotesList from "../components/NotesList/NotesList"
import NotesViewer from "../components/NotesViewer/NotesViewer"
import NotesSelect from "../components/NotesSelect/NotesSelect";
import { useParams } from "react-router-dom";

function Archived() {
  const { noteId } = useParams();
  return (
    <div className="flex">
      <NotesList />
      {!noteId ? <NotesSelect/> : <NotesViewer /> }
    </div>
  )
}

export default Archived;
