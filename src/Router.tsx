import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";
import Trash from "./pages/Trash";
import Archived from "./pages/Archived";
import Favorites from "./pages/Favorites";

function Router() {
  return (
    <Routes>
      <Route path="/" element={ <Navigate to={"/folders/053bc662-988e-4460-846c-f5f91a320da4"} /> }/>
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
