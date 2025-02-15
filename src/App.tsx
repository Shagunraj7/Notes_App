import { NotesProvider } from "./context/NotesContext";
import Sidebar from "./components/Sidebar/Sidebar";
import Router from "./Router";
import { FolderProvider } from "./context/FolderContext";

function App() {
  return (
    <>
    <FolderProvider>
      <NotesProvider>
        <div className="flex">
          <Sidebar />
          <div className="w-full">
            <Router />
          </div>
        </div>
      </NotesProvider>
      </FolderProvider>
    </>
  );
}
export default App;
