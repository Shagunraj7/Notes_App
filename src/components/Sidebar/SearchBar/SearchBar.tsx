import { useCallback, useEffect, useState } from "react";
import debounce from "lodash.debounce";
import axios from "axios";
import { Link } from "react-router-dom";
import { Note } from "../../../utils/interfaces";

const AxiosApi = axios.create({
  baseURL: "https://nowted-server.remotestate.com",
});

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  const saveNote = useCallback(
    debounce((query: string) => {
      AxiosApi.get(`/notes`, {
        params: {
          deleted: "false",
          page: 1,
          limit: 10,
          search: query,
        },
      }).then((res) => {
        setNotes(res.data.notes);
      });
    }, 500),
    [searchQuery]
  );
  useEffect(() => {
    if (searchQuery.trim() !== "") {
      saveNote(searchQuery);
    } else {
      setNotes([]);
    }
  }, [searchQuery]);

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
