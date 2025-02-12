import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import search from "../assets/search.svg";
import addFolderIcon from "../assets/folderLogo.svg";
import folder from "../assets/folder.svg";
import openFolder from "../assets/openFolder.svg";
import favorite from "../assets/favorite.svg";
import trash from "../assets/trash.svg";
import archive from "../assets/archive.svg";
import document from "../assets/document.svg";
import inactivedocument from "../assets/inactivedocument.svg";
import plus from "../assets/plus.svg";
import axios from "axios";

function Sidebar() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [folders, setFolders] = useState([]);
  const [addFolder, setAddFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  function addNewFolder() {
    axios
      .post("/api/folders", { name: newFolderName })
      .then((res) => console.log(res));
    axios.get("/api/folders").then((res) => setFolders(res.data.folders));
    setAddFolder(false);
  }
  useEffect(() => {
    {
      axios.get("/api/folders").then((res) => setFolders(res.data.folders));
    }
  }, [folders]);

  return (
    <div className="flex">
      <div className='h-screen text-white transition-all duration-300 "w-64"'>
        {" "}
        <div className="p-5 pt-7 flex gap-5 flex-col w-74">
          <div className="flex justify-between">
            <img src={logo} alt="logo" className="w-24 cursor-pointer" />
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
            <button className="bg-[rgba(255,255,255,0.05)] p-3 flex justify-center items-center gap-2">
              <img src={plus} alt="" />
              New Note
            </button>
          )}
        </div>
        <div className="flex flex-col gap-5 text-[rgba(255,255,255,0.6)]">
          <ul>
            <p className="text-xs text-gray-400 pl-5 pb-2">Recents</p>
            <li className="text-white bg-[#e50914] pl-5 pt-3 pb-3 flex gap-4">
              <img src={document} alt="" />
              Home
            </li>
            <li className="hover:bg-[rgba(255,255,255,0.05)] pl-5 pt-3 pb-3 flex gap-4">
              <img src={inactivedocument} alt="" />
              Profile
            </li>
            <li className="hover:bg-[rgba(255,255,255,0.05)] pl-5 pt-3 pb-3 flex gap-4">
              <img src={inactivedocument} alt="" />
              Logout
            </li>
          </ul>
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
                  onBlur={addNewFolder}
                  className="border-1 border-white rounded pl-2"
                />
              </li>
            )}
            <div className="h-50 overflow-auto">
              {folders.map((item: any, index: number) => (
                <NavLink
                  to={`/folders/${item.id}`}
                  className={({ isActive }) =>
                    `pl-5 pt-3 pb-3 flex gap-4 ${
                      isActive ? "text-white bg-[rgba(255,255,255,0.05)]" : ""
                    }`
                  }
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
            <li className="hover:bg-[rgba(255,255,255,0.05)] pl-5 pt-3 pb-3 flex gap-4">
              <img src={favorite} alt="" />
              Favorites
            </li>
            <li className="hover:bg-[rgba(255,255,255,0.05)] pl-5 pt-3 pb-3 flex gap-4">
              <img src={trash} alt="" />
              Trash
            </li>
            <li className="hover:bg-[rgba(255,255,255,0.05)] pl-5 pt-3 pb-3 flex gap-4">
              <img src={archive} alt="" />
              Archived Notes
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
