import option from "../assets/option.svg";
import date from "../assets/date.svg";
import folder from "../assets/folder.svg";

function NotesViewer() {
  return (
    <div className="w-full p-12 ">
      <div className="pb-9 text-3xl font-medium flex flex-row justify-between w-full">
        <p>Reflection on The Month of June</p>
        <img src={option} alt="" className="w-7 h-7" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center w-full">
          <div className="flex items-center gap-5 w-32">
            <img src={date} alt="" className="w-4" />
            <p className="opacity-60">Date</p>
          </div>
          <p>12/06/2022</p>
        </div>
        <hr className="border-gray-700 my-2" />
        <div className="flex items-center w-full">
          <div className="flex items-center gap-5 w-32">
            <img src={folder} alt="" className="w-4" />
            <p className="opacity-60">Folder</p>
          </div>
          <p>Personal</p>
        </div>
      </div>
      <div className="pt-5">
        <textarea name="" id="" className="w-full" rows={32}>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam hic
          illum officia tempore atque ipsum dicta esse sint voluptates corrupti,
          optio error in doloremque temporibus ipsa, adipisci amet deserunt
          explicabo!
        </textarea>
      </div>
    </div>
  );
}

export default NotesViewer;
