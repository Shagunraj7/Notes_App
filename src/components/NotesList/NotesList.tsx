import { NavLink, useParams } from "react-router-dom";
import { useNotes } from "../../context/NotesContext";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useFolderContext } from "../../context/FolderContext";

function NotesList() {
  const { notes, isLoading, fetchNotes } = useNotes();
  const [currentPage , setCurrentPage ] = useState(1);
  const { folderName } = useFolderContext();
  const { folderId  } = useParams();
  const [route , setRoute] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [folderId]);

  useEffect(() => {
    const queryParams = { archived: "false", favorite: "false", deleted: "false", page: currentPage ,folderId };
    if (location.pathname.startsWith("/favorites")) {
      queryParams.folderId = "";
      queryParams.favorite = "true";
      setRoute("/favorites");
      fetchNotes(queryParams);
    } else if (location.pathname.startsWith("/archived")) {
      setRoute("/archived");
      queryParams.favorite = "";
      queryParams.archived = "true";
      queryParams.folderId = "";
      fetchNotes(queryParams);
    } else if (location.pathname.startsWith("/trash")) {
      setRoute("/trash");
      queryParams.deleted = "true";
      queryParams.folderId = "";
      fetchNotes(queryParams);
    } else if (folderId){
      queryParams.favorite = "";
      fetchNotes(queryParams);
    }
  }, [folderId , currentPage]);

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
        {isLoading  && notes.length == 0 ? (
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
            {notes.length >= 10 && notes.length % 10 == 0 && <button className="bg-[rgba(255,255,255,0.1)] hover:bg-[rgba(255,255,255,0.08)] p-3 pl-6 pr-6 cursor-pointer" onClick={() => setCurrentPage(prev => prev+1)}>Load More</button>}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default NotesList;
