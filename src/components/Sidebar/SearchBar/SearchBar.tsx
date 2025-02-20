import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Note } from "../../../api.types";
import { useDebounce } from "../../../hooks/use-debounce-value";

const AxiosApi = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);
  const debouncedSearchValue = useDebounce(searchQuery, 400);

  const searchNotes = useCallback(() => {
    if (!debouncedSearchValue) {
      setNotes([]);
      return;
    }
    AxiosApi.get(`/notes`, {
      params: {
        deleted: "false",
        page: 1,
        limit: 10,
        search: debouncedSearchValue,
      },
    }).then((res) => {
      setNotes(res.data.notes);
    });
  }, [debouncedSearchValue]);

  useEffect(() => {
    searchNotes();
  }, [searchNotes]);

  return (
    <>
      <div className="relative flex flex-col w-full">
        <div>
          <input
            type="text"
            autoFocus
            onChange={(event) => setSearchQuery(event.target.value)}
            className="focus:outline-none focus:border-[#e50914] p-3 rounded w-full border border-gray-2"
            value={searchQuery}
            placeholder="Search notes..."
          />
        </div>

        {notes && notes.length > 0 && (
          <div className="absolute w-full top-13 bg-[#343434] shadow-md rounded-lg max-h-80 overflow-auto p-3">
            <ul>
              {notes.map((note) => (
                <Link
                  to={`/folders/${note.folder.id}/notes/${note.id}`}
                  key={note.id}
                  className="block p-3  hover:bg-[#616161] rounded"
                >
                  <p>{note.title}</p>
                </Link>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchBar;
