import { NavLink, useParams } from "react-router-dom";
import { useNotes } from "../../context/NotesContext";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useFolderContext } from "../../context/FolderContext";
import getDate from "../../utils/getDate";
import {  Note } from "../../api.types";
import { getQueryparams } from "../../utils/getQueryParams";

function NotesList({ sectionTitle }: { sectionTitle?: string }) {
  const { notes, isLoading, fetchNotes } = useNotes();
  const [currentPage, setCurrentPage] = useState(1);
  const { activeFolder  } = useFolderContext();
  const { folderId } = useParams();

  useEffect(() => {
    setCurrentPage(1);
  }, [folderId]);

  useEffect(() => {
    const queryParams = getQueryparams(currentPage, folderId);
    fetchNotes(queryParams);
  }, [folderId, currentPage, fetchNotes]);

  return (
    <>
      <div className="flex flex-col p-4 pt-6 bg-[#1C1C1C] gap-5">
        {isLoading && notes.length == 0 ? (
          <Shimmer />
        ) : (
          <div>
            <div className="w-81 text-xl semi-bold pb-2">
              {sectionTitle ? sectionTitle : activeFolder ? activeFolder.name : "No Folder Selected"}
            </div>
            <div className="w-full h-[90vh] overflow-auto flex flex-col gap-4">
              {notes.map((note: Note, index: number) => (
                <NavLink
                  to={
                    sectionTitle
                      ? `/${sectionTitle.toLocaleLowerCase()}/${note.id}`
                      : `/folders/${note.folderId}/notes/${note.id}`
                  }
                  key={index}
                  className={({ isActive }) =>
                    `p-5 flex flex-col gap-4 ${
                      isActive ? "bg-dark-2 pointer-events-none" : "bg-dark-1"
                    }`
                  }
                >
                  <p>{note.title}</p>
                  <div className="flex gap-4 text-xs">
                    <p className="opacity-40">{getDate(note.createdAt)}</p>
                    <p className="opacity-60">
                      {note.preview.slice(0, 28) + "..."}
                    </p>
                  </div>
                </NavLink>
              ))}
              {notes.length >= 10 && notes.length % 10 == 0 && (
                <button
                  className="bg-dark-2 hover:bg-dark-1 p-3 pl-6 pr-6 cursor-pointer"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Load More
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default NotesList;
