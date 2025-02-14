import Sidebar from "../components/Sidebar/Sidebar";
import Restore from "../components/Restore/Restore";
import { useParams } from "react-router-dom";
import TrashList from "../components/TrashList/TrashList";

function Trash() {
  const { noteId } = useParams();
  return (
    <div className="flex">
      <Sidebar />
      <TrashList />
      {noteId && <Restore />}
    </div>
  );
}

export default Trash;
