import date from "../../assets/date.svg";
import option from "../../assets/option.svg"
import folder from "../../assets/folder.svg";
import archive from "../../assets/archive.svg";
import trash from "../../assets/trash.svg";
import favorite from "../../assets/favorite.svg";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useParams , useNavigate} from "react-router-dom";
import { useFolderContext } from "../../context/FolderContext";

const AxiosApi = axios.create({ baseURL: "https://nowted-server.remotestate.com",});
const currentDate = new Date();
const day = String(currentDate.getDate()).padStart(2, "0");
const month = String(currentDate.getMonth() + 1).padStart(2, "0");
const year = currentDate.getFullYear();

const formattedDate = `${day}/${month}/${year}`;

function NotesViewer() {
  const [noteData, setNoteData] = useState({});
  const [optionsOpen, setOptionsOpen] = useState(false);
  const { noteId , folderId } = useParams();
  const { folderName }  = useFolderContext();
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!noteId || noteId === "newNote") return;
    AxiosApi.get(`/notes/${noteId}`).then((res) => setNoteData(res.data.note));
  }, [noteId]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node))
        setOptionsOpen(false);
    };

    if (optionsOpen)
      document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [optionsOpen]);

  function handleDataChange(event: any) {
    setNoteData({
      ...noteData,
      [event.target.name]: event.target.value,
    });
  }
  function handleMenu(option: string) {
    if (option == "delete") {
      AxiosApi.delete(`/notes/${noteId}`);
      setTimeout(() => navigate(`/trash/${noteId}`), 100);
    }
    AxiosApi.patch(`/notes/${noteId}`, {
      folderId,
      title: noteData.title,
      content: noteData.content,
      isFavorite: option === "favorite",
      isArchived: option == "archive" ,
    });
  }
  function saveNote(event: any) {
    event.preventDefault();
    const arr = {
      folderId,
      title: noteData.title,
      content: noteData.content,
      isFavorite: false,
      isArchived: false,
    };
    if (noteId === "newNote") {
      AxiosApi.post(`/notes`, arr).then(res => console.log(res))
    } else {
      AxiosApi.patch(`/notes/${noteId}`, arr);
    }
  }
  return (
    <div className="w-full p-12 ">
      <form onSubmit={saveNote}>
        <div className="pb-9 text-3xl font-medium flex flex-row justify-between w-full">
          <input
            type="text"
            id="title"
            name="title"
            value={noteData.title}
            onChange={handleDataChange}
            placeholder="Enter Title"
          />
          <div>
            <img
              src={option}
              alt="menu"
              className="w-7 h-7"
              onClick={() => setOptionsOpen(true)}
            />
          </div>
        </div>
        {optionsOpen && (
          <div
            ref={menuRef}
            className="absolute top-24 right-12 bg-[rgba(51,51,51,1)] p-4 flex flex-col gap-4 rounded w-55"
          >
            <button
              className="flex gap-3 hover:opacity-80"
              onClick={() => handleMenu("favorite")}
            >
              <img src={favorite} className="color-white" />
              {noteData.isArchived ? "Remove from favorites" : "Add to favorites"}
            </button>
            <button
              className="flex gap-3 hover:opacity-80"
              onClick={() => handleMenu("archive")}
            >
              <img src={archive} />
              {noteData.isFavorite ? "Remove from Archives" : "Add to archive"}
            </button>
            <hr className="text-[rgba(255,255,255,0.2)]" />
            <button
              className="flex gap-3 hover:opacity-80"
              onClick={() => handleMenu("delete")}
            >
              <img src={trash} />
              Delete
            </button>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <div className="flex items-center w-full">
            <div className="flex items-center gap-5 w-32">
              <img src={date} alt="" className="w-4" />
              <p className="opacity-60">Date</p>
            </div>
            <p>{formattedDate}</p>
          </div>
          <hr className="border-gray-700 my-2" />
          <div className="flex items-center w-full">
            <div className="flex items-center gap-5 w-32">
              <img src={folder} alt="" className="w-4" />
              <p className="opacity-60">Folder</p>
            </div>
            <p>{folderId ? folderName : noteData.folder.name}</p>
          </div>
        </div>
        <div className="pt-5">
          <textarea
            className="w-full focus:outline-none "
            rows={28}
            name="content"
            id="content"
            onChange={handleDataChange}
            value={noteData.content}
            placeholder="Write your Note" 
          ></textarea>
        </div>
        <button type="submit" className="bg-[#e50914] p-3 pl-7 pr-7 rounded hover:bg-red-700">
          submit
        </button>
      </form>
    </div>
  );
}

export default NotesViewer;
