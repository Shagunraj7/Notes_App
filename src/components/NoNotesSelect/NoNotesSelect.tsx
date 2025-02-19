import viewerDoc from "../../assets/viewerDoc.svg";

function NotesSelect() {
  return (
    <div className="flex justify-center items-center h-screen w-full flex-col gap-4">
      <img src={viewerDoc} alt="" />
      <p className="text-3xl">Select a note to view.</p>
      <p className="text-md text-center text-gray-5">
        Choose a note from the list on the left to view its contents, or create
        a <br />new note to add to your collection.
      </p>
    </div>
  );
}

export default NotesSelect;
