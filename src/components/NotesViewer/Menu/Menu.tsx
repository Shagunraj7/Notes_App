import archive from "../../../assets/archive.svg";
import trash from "../../../assets/trash.svg";
import favorite from "../../../assets/favorite.svg";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useNotes } from "../../../context/NotesContext";
import axios from "axios";
import { toast } from "react-toastify";

const AxiosApi = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

function Menu({ optionsOpen, setOptionsOpen, noteData }) {
  const menuRef = useRef<HTMLDivElement>(null);
  const { fetchNotes } = useNotes();
  const navigate = useNavigate();
  const { folderId } = useParams();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOptionsOpen(false);
      }
    };

    if (optionsOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsOpen]);

  function handleMenu(option: string) {
    if (option == "delete") {
      AxiosApi.delete(`/notes/${noteId}`);
      setTimeout(() => navigate(`/trash/${noteId}`), 100);
    }
    AxiosApi.patch(`/notes/${noteId}`, {
      folderId,
      title: noteData.title,
      content: noteData.content,
      isFavorite:
        option == "favorite" ? !noteData.isFavorite : noteData.isFavorite,
      isArchived:
        option == "archive" ? !noteData.isArchived : noteData.isArchived,
    }).then(() => {
      setTimeout(() => {
        const queryParams = {
          archived: "false",
          favorite: "false",
          deleted: "false",
          folderId,
        };
        if (location.pathname.startsWith("/favorites")) {
          queryParams.folderId = "";
          queryParams.favorite = "true";
          fetchNotes(queryParams);
        } else if (location.pathname.startsWith("/archived")) {
          queryParams.favorite = "";
          queryParams.archived = "true";
          queryParams.folderId = "";
          fetchNotes(queryParams);
        } else if (location.pathname.startsWith("/trash")) {
          queryParams.deleted = "true";
          queryParams.folderId = "";
          fetchNotes(queryParams);
        } else if (folderId) {
          queryParams.favorite = "";
          fetchNotes(queryParams);
        }
        fetchNotes(queryParams);
        toast.success("Changes Saved");
      }, 500);
    });
  }

  return (
    <>
      {optionsOpen && (
        <div
          ref={menuRef}
          className="absolute top-24 right-12 bg-dark-5 p-4 flex flex-col gap-4 rounded w-55"
        >
          <button
            className="flex gap-3 hover:opacity-80"
            onClick={() => handleMenu("favorite")}
          >
            <img src={favorite} className="color-white" alt="Favorite" />
            {noteData.isFavorite ? "Unfavorite" : "Add to favorites"}
          </button>
          <button
            className="flex gap-3 hover:opacity-80"
            onClick={() => handleMenu("archive")}
          >
            <img src={archive} alt="Archive" />
            {noteData.isArchived ? "Unarchive" : "Add to archive"}
          </button>
          <hr className="text-dark-10" />
          <button
            className="flex gap-3 hover:opacity-80"
            onClick={() => handleMenu("delete")}
          >
            <img src={trash} alt="Trash" />
            Delete
          </button>
        </div>
      )}
    </>
  );
}

export default Menu;
