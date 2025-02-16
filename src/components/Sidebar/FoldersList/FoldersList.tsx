import addFolderIcon from "../../../assets/folderLogo.svg";
import folder from "../../../assets/folder.svg";
import openFolder from "../../../assets/openFolder.svg";
import { useEffect, useState } from "react";
import { useFolderContext } from "../../../context/FolderContext";
import { NavLink } from "react-router-dom";
import axios from "axios";

const AxiosApi = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

function FoldersList({}) {
  const { folders, setActiveFolder, fetchFolders, setActiveFolderName } = useFolderContext();
  const [addFolder, setAddFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("New Folder");

  function addNewFolder() {
    AxiosApi.post("/folders", { name: newFolderName });
    fetchFolders();
    setAddFolder(false);
  }
  return (
    <div>
      <ul>
        <div className="flex justify-between pr-5">
          <p className="text-xs text-gray-400 pl-5 pb-2">Folders</p>
          <img
            src={addFolderIcon}
            alt=""
            className="cursor-pointer"
            onClick={() => setAddFolder(true)}
          />
        </div>
        {addFolder && (
          <li className="text-white pl-5 pt-3 pb-3 flex gap-4">
            <img src={openFolder} alt="" />
            <input
              type="text"
              autoFocus
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addNewFolder()}
              onBlur={addNewFolder}
              className="border-1 border-white rounded pl-2"
            />
          </li>
        )}
        <div className="max-h-90 overflow-auto">
          {folders &&
            folders.map((item: any, index: number) => (
              <NavLink
                to={`/folders/${item.id}`}
                className={({ isActive }) => {
                  if (isActive) {
                    setActiveFolder(item.id);
                    setActiveFolderName(item.name);
                  }
                  return `hover:bg-[rgba(255,255,255,0.05)] pl-5 pt-3 pb-3 flex gap-4 ${
                    isActive ? "text-white bg-[rgba(255,255,255,0.05)]" : ""
                  }`;
                }}
                key={index}
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={isActive ? openFolder : folder}
                      alt="Folder Icon"
                    />
                    {item.name}
                  </>
                )}
              </NavLink>
            ))}
        </div>
      </ul>
    </div>
  );
}

export default FoldersList;
