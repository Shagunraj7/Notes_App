import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";
import Trash from "./pages/Trash";
import Archived from "./pages/Archived";
import Favorites from "./pages/Favorites";

function Router() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to={"/folders/fd9bb48a-d86c-40a8-8b18-47f264597c5e"} /> }/>
      <Route path="folders/:folderId" element={<Home />} />
      <Route path="folders/:folderId/notes/:noteId" element={<Home />} />
      <Route path="trash/*" element={<Home />} />
      <Route path="trash/:noteId" element={<Trash />} />
      <Route path="archived/*" element={<Archived />} />
      <Route path="archived/:noteId" element={<Archived />} />
      <Route path="favorites/*" element={<Favorites />} />
      <Route path="favorites/:noteId" element={<Favorites />} />
    </Routes>
  );
}
export default Router;
