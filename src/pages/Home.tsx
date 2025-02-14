import { useParams , useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import NotesList from "../components/NotesList/NotesList";
import NotesViewer from "../components/NotesViewer/NotesViewer";
import { useNotes } from "../context/NotesContext";
import { useEffect, useState } from "react";
import Restore from "../components/Restore/Restore";
import axios from "axios";

function Home() {
  const { folderId } = useParams();
  const location = useLocation();
  const { fetchNotes } = useNotes(); 

  useEffect(() => {
    let queryParams = { archived: "false", favorite: "false", folderId };
    if (location.pathname === "/favorites") {
      queryParams.favorite = "true";
    } else if (location.pathname === "/archived") {
      queryParams.archived = "true";
    }
    fetchNotes(queryParams);
  }, [folderId, location.pathname]);
  
  return (
    <>
        <div className="flex">
          <Sidebar />
          <NotesList />
          <NotesViewer />
        </div>
    </>
  );
}

export default Home;
