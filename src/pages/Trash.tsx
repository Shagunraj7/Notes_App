import Restore from "../components/Restore/Restore";
import { useParams } from "react-router-dom";
import NotesSelect from "../components/NoNotesSelect/NoNotesSelect";
import NotesList from "../components/NotesList/NotesList";

function Trash() {
  const { noteId } = useParams();

  return (
    <div className="flex">
      <NotesList />
      {noteId ? <Restore /> : <NotesSelect/>}
    </div>
  );
}

export default Trash;
