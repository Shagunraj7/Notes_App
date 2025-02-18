import date from "../../../assets/date.svg";
import option from "../../../assets/option.svg";
import { useState } from "react";
import { useParams } from "react-router-dom";
import getDate from "../../../context/getDate";
import Menu from "../Menu/Menu";
import FolderDetails from "./FolderDetails/FolderDetails";

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


function NoteDetails({ noteData, handleDataChange , folderChange , setFolderChange}) {
  
  const [optionsOpen, setOptionsOpen] = useState<boolean>(false);
  const { noteId} = useParams<{
    noteId: string;
  }>();

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
          className="w-full outline-0"
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
      />
      <div className="flex flex-col gap-2">
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
        <FolderDetails
          handleDataChange={handleDataChange}
          noteData={noteData}
          folderChange={folderChange}
          setFolderChange={setFolderChange}
        />
      </div>
    </>
  );
}

export default NoteDetails;
