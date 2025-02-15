const Shimmer = () => {
    return (
      <div className="flex flex-col p-1 pt-3 bg-[#1C1C1C] gap-5">
        <div className="w-41 h-6 bg-[rgba(255,255,255,0.1)] rounded shimmer"></div>
  
        <div className="w-full h-[90vh] overflow-auto flex flex-col gap-4">
          {[1, 2, 3, 4, 5, 6 , 7 , 8 ].map((_, index) => (
            <div
              key={index}
              className="p-5 flex w-79 flex-col gap-4 bg-[rgba(255,255,255,0.03)] shimmer"
            >
              <div className="h-4 w-3/4 bg-[rgba(255,255,255,0.1)] rounded shimmer"></div>
  
              <div className="flex gap-4 text-xs">
                <div className="h-3 w-20 bg-[rgba(255,255,255,0.1)] rounded shimmer"></div>
                <div className="h-3 w-24 bg-[rgba(255,255,255,0.1)] rounded shimmer"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
export default Shimmer;