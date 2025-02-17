import date from "../../../assets/date.svg";
import option from "../../../assets/option.svg";
import folder from "../../../assets/folder.svg";
import { useState } from "react";
import { useFolderContext } from "../../../context/FolderContext";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import getDate from "../../../context/getDate";
import Menu from "../Menu/Menu";
import { useNotes } from "../../../context/NotesContext";

const AxiosApi = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

interface NoteData {
  title: string;
  content: string;
  createdAt?: string;
  isFavorite: boolean;
  isArchived: boolean;
  folder?: {
    name: string;
  };
}

interface NoteDetailsProps {
  noteData: NoteData;
  handleDataChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

interface FolderContextType {
  folderName: string | undefined;
}

function NoteDetails({ noteData, handleDataChange }: NoteDetailsProps) {
  const { folderName } = useFolderContext() as FolderContextType;
  const { fetchNotes } = useNotes();
  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);
  const { noteId, folderId } = useParams<{
    noteId: string;
    folderId: string;
  }>();
  const navigate = useNavigate();

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
    }).then((res) => {
      setTimeout(() => {
      const queryParams = { archived: "false", favorite: "false", deleted: "false", folderId};
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
    },500);
    });
  }
  function handleFolderChange() {
    setFolderChange(true);
  }

  return (
    <>
      <div className="pb-9 text-3xl font-medium flex flex-row justify-between w-full">
        <input
          type="text"
          id="title"
          name="title"
          value={noteData.title}
          onChange={handleDataChange}
          placeholder="Enter Title"
        />
        {noteId !== "newNote" && (
          <div>
            <img
              src={option}
              alt="menu"
              className="w-7 h-7"
              onClick={() => setOptionsOpen(true)}
            />
          </div>
        )}
      </div>
      <Menu
        optionsOpen={optionsOpen}
        setOptionsOpen={setOptionsOpen}
        noteData={noteData}
        handleMenu={handleMenu}
      />
      <div className="flex flex-col gap-2" onClick={handleFolderChange}>
        <div className="flex items-center w-full">
          <div className="flex items-center gap-5 w-32">
            <img src={date} alt="Date" className="w-4" />
            <p className="opacity-60">Date</p>
          </div>
          <p>
            {noteData.createdAt ? getDate(noteData.createdAt) : getDate("")}
          </p>
        </div>
        <hr className="text-dark-5 my-2" />
        <div className="flex items-center w-full" >
          <div className="flex items-center gap-5 w-32">
            <img src={folder} alt="Folder" className="w-4" />
            <p className="opacity-60">Folder</p>
          </div>
          <p>{folderId ? folderName : noteData.folder?.name || ""}</p>
        </div>
      </div>
    </>
  );
}

export default NoteDetails;
