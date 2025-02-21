import { useEffect, useRef } from "react";
import { useFolderContext } from "../../../../context/FolderContext";
import folder from "../../../../assets/folder.svg";
import { useParams } from "react-router-dom";
import { Folder, NoteData } from "../../../../api.types";

interface NoteDetailsProps {
  noteData: NoteData;
  handleDataChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | React.MouseEvent<HTMLButtonElement>) => void;
  folderChange: boolean;
  setFolderChange: React.Dispatch<React.SetStateAction<boolean>>;
}


function FolderDetails({ noteData, handleDataChange, folderChange, setFolderChange }: NoteDetailsProps) {
  const { activeFolder , folders } = useFolderContext();
  const folderRef = useRef<HTMLDivElement>(null);
  const { folderId } = useParams<{
    folderId: string;
  }>();
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        folderRef.current &&
        !folderRef.current.contains(event.target as Node)
      ) {
        setFolderChange(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setFolderChange]);

  function callNoteDataChange(event: React.MouseEvent<HTMLButtonElement>) {
    handleDataChange(event);
    setFolderChange(false);
  }

  return (
    <>
      <div
        className="flex items-center cursor-pointer hover:opacity-70]"
        onClick={() => setFolderChange(true)}
        ref={folderRef}
      >
        <div className="flex items-center gap-5 w-32">
          <div>
            <div className="flex gap-5">
              <img src={folder} alt="Folder" className="w-4" />
              <p className="opacity-60">Folder</p>
            </div>
            <ul className="absolute max-h-100 w-80 bg-dark-5 overflow-auto rounded-md shadow-xl ">
              {folderChange &&
                folders &&
                folders.map((item: Folder, index: number) => (
                  <button
                    className={`hover:bg-dark-1 w-full pl-5 p-3 flex gap-4 shadow-2xl`}
                    key={index}
                    name="folderId"
                    data-id={item.id}
                    onClick={callNoteDataChange}
                  >
                    <img src={folder} />
                    {item.name}
                  </button>
                ))}
            </ul>
          </div>
        </div>
        <p>{folderId ? activeFolder?.name : noteData.folder?.name || ""}</p>
      </div>
    </>
  );
}

export default FolderDetails;
