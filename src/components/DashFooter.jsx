const DashFooter = () => {
  return (
    <footer className="bg-white border-t border-gray-100 px-6 py-4">
    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} Swapify. All rights reserved.
      </p>
      <div className="flex space-x-6">
        <a href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
          Privacy
        </a>
        <a href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
          Terms
        </a>
        <a href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
          Contact
        </a>
        <a href="#" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
          Help Center
        </a>
      </div>
    </div>
  </footer>
  );
};

export default DashFooter;
