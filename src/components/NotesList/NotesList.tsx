import { NavLink } from "react-router-dom";
import { useNotes } from "../../context/NotesContext";

function NotesList() {
  const { notes } = useNotes(); 
  function convertDate(fetchedDate: string): string {
    const date = new Date(fetchedDate);

    const day = String(date.getUTCDate()).padStart(2, "0"); 
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); 
    const year = date.getUTCFullYear();

    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  return (
    <>
      <div className="flex flex-col p-4 pt-6 bg-[#1C1C1C] gap-5">
        <div className="w-81 text-xl semi-bold pb-2">Personal</div>
        <div className="w-full h-[90vh] overflow-auto flex flex-col gap-4">
          {notes.map((note: any, index: number) => (
            <NavLink
              to={`/folders/${note.folderId}/notes/${note.id}`}
              key={index}
              className="bg-[rgba(255,255,255,0.03)] p-5 flex flex-col gap-4"
            >
              <p>{note.title}</p>
              <div className="flex gap-4 text-xs">
                <p className="opacity-40">{convertDate(note.createdAt)}</p>
                <p className="opacity-60">{note.preview.slice(0, 35) + "..."}</p>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </>
  );
}

export default NotesList;
