import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import "./index.css";
import Trash from "./pages/Trash";
import Archived from "./pages/Archived";
import Favorites from "./pages/Favorites";

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/folders/fa7f183b-9e10-4099-b845-bea1c9cb54c6" />} />

          <Route path="folders/:folderId" element={<Home />} />
          <Route path="folders/:folderId/notes/:noteId" element={<Home />} />

          <Route path="trash" element={<Trash />} />
          <Route path="trash/:noteId" element={<Trash />} />

          <Route path="archived" element={<Archived />} />
          <Route path="archived/:noteId" element={<Archived />} />

          <Route path="favorites" element={<Favorites />} />
          <Route path="favorites/:noteId" element={<Favorites />} />
        </Route>
      </Routes>
  );
}

export default App;
