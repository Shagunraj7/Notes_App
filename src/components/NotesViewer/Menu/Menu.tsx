import archive from "../../../assets/archive.svg";
import trash from "../../../assets/trash.svg";
import favorite from "../../../assets/favorite.svg";
import { useEffect, useRef } from "react";


function Menu({optionsOpen , setOptionsOpen , noteData , handleMenu}) {
    const menuRef = useRef<HTMLDivElement>(null);

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
  )
}

export default Menu
