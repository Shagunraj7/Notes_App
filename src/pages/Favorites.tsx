import { useParams } from "react-router-dom";
import NotesList from "../components/NotesList/NotesList";
import NotesViewer from "../components/NotesViewer/NotesViewer";
import NotesSelect from "../components/NotesSelect/NotesSelect";

function Favorites() {
  const { noteId } = useParams();
  return (
    <div className="flex">
      <NotesList />
      { noteId ?<NotesViewer /> : <NotesSelect/>}
    </div>
  );
}

export default Favorites;
