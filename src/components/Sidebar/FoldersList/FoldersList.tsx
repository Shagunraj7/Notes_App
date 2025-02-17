import addFolderIcon from "../../../assets/folderLogo.svg";
import folder from "../../../assets/folder.svg";
import trash from "../../../assets/trash.svg";
import openFolder from "../../../assets/openFolder.svg";
import { useState } from "react";
import { useFolderContext } from "../../../context/FolderContext";
import { NavLink } from "react-router-dom";
import axios from "axios";

const AxiosApi = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

function FoldersList({}) {
  const { folders, setActiveFolder, fetchFolders, setActiveFolderName } =
    useFolderContext();
  const [editingFolderId, setEditingFolderId] = useState(null);
  const [editedFolderName, setEditedFolderName] = useState("");

  function addNewFolder() {
    AxiosApi.post("/folders", { name: "New Folder" });
    setTimeout(() => {
      fetchFolders();
    }, 500);
  }
  const handleEditFolder = (folderId, currentName) => {
    setEditingFolderId(folderId);
    setEditedFolderName(currentName);
  };

  const saveFolderName = async (folderId) => {
    try {
      await AxiosApi.patch(`/folders/${folderId}`, { name: editedFolderName });
      fetchFolders();
      setEditingFolderId(null);
    } catch (error) {
      console.error("Error updating folder name:", error);
    }
  };

  const deleteFolder = (id: string) => {
    AxiosApi.delete(`/folders/${id}`).then((res) => {
      fetchFolders();
    });
  };

  return (
    <div>
      <ul>
        <div className="flex justify-between pr-5">
          <p className="text-xs text-gray-400 pl-5 pb-2">Folders</p>
          <img
            src={addFolderIcon}
            alt=""
            className="cursor-pointer"
            onClick={() => addNewFolder()}
          />
        </div>
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
                  return `hover:bg-dark-0 pl-5 p-3 flex gap-4 ${
                    isActive ? "text-white bg-dark-0" : ""
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
                    {editingFolderId === item.id ? (
                      <input
                        type="text"
                        value={editedFolderName}
                        onChange={(e) => setEditedFolderName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            saveFolderName(item.id);
                          }
                        }}
                        onBlur={() => saveFolderName(item.id)}
                        autoFocus
                        className="border-1 border-white rounded pl-2"
                      />
                    ) : (
                      <div
                        onDoubleClick={() =>
                          handleEditFolder(item.id, item.name)
                        }
                        className="flex w-full justify-between pr-1"
                      >
                        <p>{item.name}</p>
                        <img
                          src={trash}
                          alt="Delete Folder"
                          className="cursor-pointer opacity-50 w-5"
                          onClick={() => deleteFolder(item.id)}
                        />
                      </div>
                    )}
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
