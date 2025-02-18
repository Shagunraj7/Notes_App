import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.svg";
import search from "../../assets/search.svg";
import favorite from "../../assets/favorite.svg";
import trash from "../../assets/trash.svg";
import archive from "../../assets/archive.svg";
import plus from "../../assets/plus.svg";
import axios, { AxiosResponse } from "axios";
import { useFolderContext } from "../../context/FolderContext";
import Shimmer from "./Shimmer";
import FoldersList from "./FoldersList/FoldersList";
import RecentsList from "./RecentsList/RecentsList";
import { useNotes } from "../../context/NotesContext";
import SearchBar from "./SearchBar/SearchBar";

interface RecentNote {
  id: string;
  title: string;
  content: string;
  isFavorite: boolean;
  isArchived: boolean;
  folderId: string;
}

const AxiosApi = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

function Sidebar() {
  const { activeFolder, fetchFolders, isLoading } = useFolderContext();
  const { setActiveFolderName } = useFolderContext();
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState<boolean>(false);
  const [recents, setRecents] = useState<RecentNote[]>([]);
  const { fetchNotes } = useNotes();

  useEffect(() => {
    fetchFolders();
    AxiosApi.get<{ recentNotes: RecentNote[] }>("/notes/recent").then((res: AxiosResponse<{ recentNotes: RecentNote[] }>) =>
      setRecents(res.data.recentNotes)
    );
  }, [fetchFolders]);

  function addNewNote() {
    AxiosApi.post<{ id: string }>(`/notes`, {
      folderId: activeFolder,
      title: "New Note",
      content: "",
      isFavorite: false,
      isArchived: false,
    }).then((res: AxiosResponse<{ id: string }>) => {
      fetchNotes({ folderId: activeFolder });
      navigate(`/folders/${activeFolder}/notes/${res.data.id}`);
    });
  }

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
          {searchOpen && <SearchBar />}
          {!searchOpen && (
            <button
              onClick={addNewNote}
              className="bg-dark-1 hover:bg-dark-2 p-3 flex justify-center items-center gap-2"
            >
              <img src={plus} alt="" />
              New Note
            </button>
          )}
        </div>
        {isLoading && !recents ? (
          <Shimmer />
        ) : (
          <div className="flex flex-col gap-5 text-dark-10">
            <RecentsList recents={recents} />
            <FoldersList />
            <ul>
              <p className="text-xs text-gray-400 pl-5 pb-2">More</p>
              <NavLink
                to={`/favorites`}
                className={({ isActive }) => {
                  if (isActive) setActiveFolderName("Favorites");
                  return `pl-5 pt-3 pb-3 flex gap-4 ${
                    isActive
                      ? "text-white bg-netflix"
                      : "hover:bg-dark-0"
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
                  return ` pl-5 pt-3 pb-3 flex gap-4 ${
                    isActive
                      ? "text-white bg-netflix"
                      : "hover:bg-dark-0"
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
                  return `pl-5 pt-3 pb-3 flex gap-4 ${
                    isActive
                      ? "text-white bg-netflix"
                      : "hover:bg-dark-0"
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