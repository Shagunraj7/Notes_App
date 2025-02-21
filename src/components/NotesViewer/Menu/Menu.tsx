import archive from "../../../assets/archive.svg";
import trash from "../../../assets/trash.svg";
import favorite from "../../../assets/favorite.svg";
import { useCallback, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { NoteData } from "../../../api.types";

const AxiosApi = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

interface MenuProps {
  optionsOpen: boolean;
  setOptionsOpen: (open: boolean) => void;
  noteData: NoteData;
  handleDataChange: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

function Menu({ optionsOpen, setOptionsOpen, noteData, handleDataChange }: MenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { noteId } = useParams<{ noteId: string }>();

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
  }, [optionsOpen, setOptionsOpen]);

  const handleMenu = useCallback(async (event: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = event.currentTarget; 

    if (name === "delete") {
      await AxiosApi.delete(`/notes/${noteId}`);
      setTimeout(() => navigate(`/trash/${noteId}`), 100);
    }

    handleDataChange(event);
  },[handleDataChange, navigate, noteId]);

  return (
    <>
      {optionsOpen && (
        <div
          ref={menuRef}
          className="absolute top-24 right-12 bg-dark-5 p-4 flex flex-col gap-4 rounded w-55"
        >
          <button
            className="flex gap-3 hover:opacity-80"
            name="isFavorite"
            onClick={handleMenu}
          >
            <img src={favorite} className="color-white" alt="Favorite" />
            {noteData.isFavorite ? "Unfavorite" : "Add to favorites"}
          </button>
          <button
            className="flex gap-3 hover:opacity-80"
            name="isArchived"
            onClick={handleMenu}
          >
            <img src={archive} alt="Archive" />
            {noteData.isArchived ? "Unarchive" : "Add to archive"}
          </button>
          <hr className="text-dark-10" />
          <button
            className="flex gap-3 hover:opacity-80"
            name="delete"
            onClick={handleMenu}
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
