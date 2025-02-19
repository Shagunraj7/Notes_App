import { NavLink } from "react-router-dom";
import document from "../../../assets/document.svg";
import inactivedocument from "../../../assets/inactivedocument.svg";

interface RecentsListProps {
    recents: any[];
  }

const RecentsList: React.FC<RecentsListProps> = ({ recents }) =>  {
  return (
    <div>
      <p className="text-xs text-gray-400 pl-5 pb-2">Recents</p>
      {recents &&
        recents.map((note, index: number) => (
          <NavLink
            to={`/folders/${note.folder.id}/notes/${note.id}`}
            className={({ isActive }) =>
              `text-white pl-5 pt-3 pb-3 flex gap-4 ${
                isActive ? "bg-[#e50914]" : ""
              }`
            }
            key={index}
          >
            {({ isActive }) => (
              <>
                <img src={isActive ? document : inactivedocument} alt="" />
                {note.title}
              </>
            )}
          </NavLink>
        ))}
    </div>
  );
}

export default RecentsList;
