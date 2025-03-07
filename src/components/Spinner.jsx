const Spinner = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative w-16 h-16">
        <div className="w-16 h-16 border-4 border-t-sky-500 border-r-sky-400 border-b-sky-300 border-l-sky-200 rounded-full animate-spin"></div>
      </div> 
      <div className="mt-4 text-sky-800 font-medium">Loading...</div>
    </div>
  );
};

export default Spinner;