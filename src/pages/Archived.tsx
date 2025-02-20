import NotesList from "../components/NotesList/NotesList"
import NotesViewer from "../components/NotesViewer/NotesViewer"
import NotesSelect from "../components/NoNotesSelect/NoNotesSelect";
import { useParams } from "react-router-dom";

function Archived() {
  const { noteId } = useParams();
  return (
    <div className="flex">
      <NotesList sectionTitle="Archived"/>
      {!noteId ? <NotesSelect/> : <NotesViewer /> }
    </div>
  )
}

export default Archived;
