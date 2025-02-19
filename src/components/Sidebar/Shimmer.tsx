const Shimmer = () => {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <div className="h-4 w-20 bg-dark-1 mb-2 ml-5 shimmer"></div>
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="h-10 bg-dark-1 mb-2 shimmer"></div>
        ))}
      </div>

      <ul>
        <div className="flex justify-between">
          <div className="h-4 w-20 bg-dark-1 mb-2 ml-5 shimmer"></div>
        </div>
        {[1, 2, 3 , 4, 5 , 6 , 7,8].map((_, index) => (
          <div key={index} className="h-10 bg-dark-1 mb-2 shimmer"></div>
        ))}
      </ul>

      <ul>
        <div className="h-4 w-20 bg-dark-1 mb-2 ml-5 shimmer"></div>
        {[1, 2, 3].map((_, index) => (
          <div key={index} className="h-10 bg-dark-1 mb-2 shimmer"></div>
        ))}
      </ul>
    </div>
  );
};

export default Shimmer;