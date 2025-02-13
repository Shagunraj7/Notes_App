import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import InvalidPath from "./pages/InvalidPath"
import "./index.css";
import { NotesProvider } from './context/NotesContext'; 

function App() {
  return (
    <NotesProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="folders/:folderId" element={<Home />} />
        <Route path="folders/:folderId/notes/:noteId" element={<Home />} />
        <Route path="trash" element={<Home />} />
        <Route path="archived" element={<Home />} />
        <Route path="favorites" element={<Home />} />
        <Route path="*" element={<InvalidPath />} />
      </Routes>
    </NotesProvider>
  );
}

export default App;
