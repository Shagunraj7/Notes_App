import { useEffect, useState } from "react";
import { Link, NavLink, useParams } from "react-router-dom";
import logo from "../../assets/logo.svg";
import search from "../../assets/search.svg";
import addFolderIcon from "../../assets/folderLogo.svg";
import folder from "../../assets/folder.svg";
import openFolder from "../../assets/openFolder.svg";
import favorite from "../../assets/favorite.svg";
import trash from "../../assets/trash.svg";
import archive from "../../assets/archive.svg";
import document from "../../assets/document.svg";
import inactivedocument from "../../assets/inactivedocument.svg";
import plus from "../../assets/plus.svg";
import axios from "axios";
import { useFolderContext } from "../../context/FolderContext";
import Shimmer from "./Shimmer";

const AxiosApi = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

function Sidebar() {
  const { folders, activeFolder, setActiveFolder, fetchFolders, isLoading } =
    useFolderContext();
  const { setActiveFolderName } = useFolderContext();
  const [searchOpen, setSearchOpen] = useState(false);
  const [recents, setRecents] = useState([]);
  const [addFolder, setAddFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("New Folder");

  function addNewFolder() {
    AxiosApi.post("/folders", { name: newFolderName });
    fetchFolders();
    setAddFolder(false);
  }
  useEffect(() => {
    fetchFolders();
    AxiosApi.get("/notes/recent")
      .then((res) => setRecents(res.data.recentNotes))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex">
      <div className='h-screen text-white transition-all duration-300 "w-64"'>
        <div className="p-5 pt-7 flex gap-5 flex-col w-74">
          <div className="flex justify-between">
            <img
              src={logo}
              alt="logo"
              className="w-24 cursor-pointer fill-[#e50914]"
            />
            <img
              src={searchOpen ? plus : search}
              alt="search"
              className={`w-5 cursor-pointer transition-transform duration-300 ${
                searchOpen ? "rotate-45 opacity-50" : ""
              }`}
              onClick={() => setSearchOpen((prev) => !prev)}
            />
          </div>
          {searchOpen && (
            <div>
              <input
                type="text"
                autoFocus
                className="focus:outline-none focus:border-[#e50914] p-3 rounded w-full border-1 border-[rgba(255,255,255,0.2)] "
              />
            </div>
          )}
          {!searchOpen && (
            <Link
              to={`/folders/${activeFolder}/notes/newNote`}
              className="bg-[rgba(255,255,255,0.05)] p-3 flex justify-center items-center gap-2 cursor-pointer"
            >
              <img src={plus} alt="" />
              New Note
            </Link>
          )}
        </div>
        {isLoading ? (
          <Shimmer />
        ) : (
          <div className="flex flex-col gap-5 text-[rgba(255,255,255,0.6)]">
            <div>
              <p className="text-xs text-gray-400 pl-5 pb-2">Recents</p>
              {recents &&
                recents.map((note, index: number) => (
                  <NavLink
                    to={`/folders/${note.folder.id}/notes/${note.id}`}
                    className={({ isActive }) =>
                      `text-white pl-5 pt-3 pb-3 flex gap-4 ${
                        isActive ? "bg-[#e50914]" : ""
                      }`
                    }
                    key={index}
                  >
                    {({ isActive }) => (
                      <>
                        <img
                          src={isActive ? document : inactivedocument}
                          alt=""
                        />
                        {note.title}
                      </>
                    )}
                  </NavLink>
                ))}
            </div>
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
                          isActive
                            ? "text-white bg-[rgba(255,255,255,0.05)]"
                            : ""
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
            <ul>
              <p className="text-xs text-gray-400 pl-5 pb-2">More</p>
              <NavLink
                to={`/favorites`}
                className={({ isActive }) => {
                  if (isActive) setActiveFolderName("Favorites");
                  return `hover:bg-[rgba(255,255,255,0.05)] pl-5 pt-3 pb-3 flex gap-4 ${
                    isActive ? "text-white bg-[rgba(255,255,255,0.05)]" : ""
                  }`;
                }}
              >
                <img src={favorite} alt="" />
                Favorites
              </NavLink>
              <NavLink
                to={`/trash`}
                className={({ isActive }) => {
                  if (isActive) setActiveFolderName("Trash");
                  return `hover:bg-[rgba(255,255,255,0.05)] pl-5 pt-3 pb-3 flex gap-4 ${
                    isActive ? "text-white bg-[rgba(255,255,255,0.05)]" : ""
                  }`;
                }}
              >
                <img src={trash} alt="" />
                Trash
              </NavLink>
              <NavLink
                to={`/archived`}
                className={({ isActive }) => {
                  if (isActive) setActiveFolderName("Archived");
                  return `hover:bg-[rgba(255,255,255,0.05)] pl-5 pt-3 pb-3 flex gap-4 ${
                    isActive ? "text-white bg-[rgba(255,255,255,0.05)]" : ""
                  }`;
                }}
              >
                <img src={archive} alt="" />
                Archived Notes
              </NavLink>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
