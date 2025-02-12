import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function NotesList() {
  const { id } = useParams();
  const [data , setData] = useState([]);
  useEffect(() => {
    console.log(id);
  },[id])

  return (
    <>
      <div className="flex flex-col p-4 pt-6 bg-[#1C1C1C] gap-5">
        <div className="w-81 text-xl semi-bold pb-2">Personal</div>
        <div className="w-full h-[90vh] overflow-auto flex flex-col gap-4">
        {[...Array(19)].map((_, index) => (
          <div
            key={index}
            className="bg-[rgba(255,255,255,0.03)] p-5 flex flex-col gap-4"
          >
            <p>My Goals for the Next Year</p>
            <div className="flex gap-4 text-xs">
              <p className="opacity-40">31/12/2022</p>
              <p className="opacity-60">As the year comes to a ...</p>
            </div>
          </div>
        ))}
        </div>
      </div>
    </>
  );
}

export default NotesList;
