import { NavLink, useParams } from "react-router-dom";
import { useNotes } from "../../context/NotesContext";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useFolderContext } from "../../context/FolderContext";

function NotesList() {
  const { notes, isLoading, fetchNotes } = useNotes();
  const { folderName } = useFolderContext();
  const { folderId  } = useParams();
  const [route , setRoute] = useState("");

  useEffect(() => {
    let queryParams = { archived: "false", favorite: "false", deleted: "false",folderId };
    if (folderId){
      queryParams.favorite = "true";
      fetchNotes(queryParams);
    }
    else if (location.pathname.startsWith("/favorites")) {
      queryParams.favorite = "true";
      setRoute("/favorites");
      fetchNotes(queryParams);
    } else if (location.pathname.startsWith("/archived")) {
      setRoute("/archived");
      queryParams.archived = "true";
      fetchNotes(queryParams);
    } else if (location.pathname.startsWith("/trash")) {
      setRoute("/trash");
      queryParams.deleted = "true";
      fetchNotes(queryParams);
    } 
  }, [folderId, location.pathname]);

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
        {isLoading ? (
          <Shimmer />
        ) : (
          <div>
            <div className="w-81 text-xl semi-bold pb-2">{folderName}</div>
            <div className="w-full h-[90vh] overflow-auto flex flex-col gap-4">
              {notes.map((note: any, index: number) => (
                <NavLink
                  to={ folderId ? `/folders/${note.folderId}/notes/${note.id}` : `${route}/${note.id}` }
                  key={index}
                  className={({ isActive }) =>
                    `p-5 flex flex-col gap-4 ${
                      isActive
                        ? "bg-[rgba(255,255,255,0.1)] pointer-events-none"
                        : "bg-[rgba(255,255,255,0.03)]"
                    }`
                  }
                >
                  <p>{note.title}</p>
                  <div className="flex gap-4 text-xs">
                    <p className="opacity-40">{convertDate(note.createdAt)}</p>
                    <p className="opacity-60">
                      {note.preview.slice(0, 28) + "..."}
                    </p>
                  </div>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default NotesList;
