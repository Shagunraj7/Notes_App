
import { NotesProvider } from "./context/NotesContext";
import Sidebar from "./components/Sidebar/Sidebar";
import { FolderProvider } from "./context/FolderContext";
import { ToastContainer } from "react-toastify";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <FolderProvider>
        <NotesProvider>
          <div className="flex">
            <ToastContainer
              position="top-center"
              theme="dark"
              autoClose={2500}
              limit={3}
            />
            <Sidebar />
            <div className="w-full">
              <Outlet />
            </div>
          </div>
        </NotesProvider>
      </FolderProvider>
    </>
  );
}
export default Layout;
