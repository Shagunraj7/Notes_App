import { useParams } from "react-router-dom";
import NotesList from "../components/NotesList/NotesList";
import NotesSelect from "../components/NoNotesSelect/NoNotesSelect";
import NotesViewer from "../components/NotesViewer/NotesViewer";

function Home() {
  const { noteId } = useParams();

  return (
    <div className="flex">
      <NotesList />
      {noteId ? <NotesViewer /> : <NotesSelect />}
    </div>
  );
}

export default Home;
