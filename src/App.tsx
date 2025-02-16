import { NotesProvider } from "./context/NotesContext";
import Sidebar from "./components/Sidebar/Sidebar";
import Router from "./Router";
import { FolderProvider } from "./context/FolderContext";
import {  ToastContainer } from "react-toastify";

function App() {
  return (
    <>
    <FolderProvider>
      <NotesProvider >
        <div className="flex">
        <ToastContainer position="top-center" theme="dark" autoClose={2500} limit={3}/>
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
