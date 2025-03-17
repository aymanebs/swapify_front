import React, {useState, useEffect} from 'react';
import {
  Search,
  Sliders,
  Package,
  Star,
  Heart,
  ChevronDown,
  X,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  Gift,
  ShoppingBag,
  Clock,
  MapPin,
  Zap,
  Shield,
  Trophy,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {getAllItems} from '../services/itemsApi';
import {getAllcategories} from '../services/categoriesApi';
import { conditions } from '../constants/condition';
import { getImageUrl } from '../helpers/getImageUrl';

export const Items = () => {
  const [categories, setCategories] = useState ([]);
  const [selectedCategories, setSelectedCategories] = useState ([]);
  const [priceRange, setPriceRange] = useState ([0, 1000]);
  const [showFilters, setShowFilters] = useState (false);
  const [scrolled, setScrolled] = useState (false);
  const [currentPage, setCurrentPage] = useState (1);
  const totalPages = 8;
  const [items, setItems] = useState ([]);
  const [filtredItems, setFiltredItems] = useState ([]);

  console.log('filtred items: ',filtredItems);

  useEffect (() => {
    async function fetchItems () {
      try {
        const items = await getAllItems ();
        setItems (items);
        setFiltredItems (items);
      } catch (error) {
        console.error ('Failed to fetch items', error);
      }
    }
    fetchItems ();
  }, []);



  useEffect (() => {
    const handleScroll = () => {
      setScrolled (window.scrollY > 0);
    };
    window.addEventListener ('scroll', handleScroll);
    return () => window.removeEventListener ('scroll', handleScroll);
  }, []);

  useEffect (() => {
    async function fetchCategories () {
      try {
        const data = await getAllcategories ();
        setCategories (data);
      } catch (error) {
        console.error ('Failed to fetch categories', error);
      }
    }

    fetchCategories ();
  }, []);

  const navigate = useNavigate ();

  const stats = [
    {icon: Users, label: 'Active Traders', value: '50K+'},
    {icon: Gift, label: 'Items Traded', value: '100K+'},
    {icon: TrendingUp, label: 'Monthly Trades', value: '15K+'},
  ];

  const featuredCollections = [
    {title: 'New Arrivals', icon: ShoppingBag, count: 156},
    {title: 'Ending Soon', icon: Clock, count: 89},
    {title: 'Near You', icon: MapPin, count: 234},
  ];

  const handleFilter = (category,condition, query) => {
    setSelectedCategories (prev => {
      const updatedCategories = prev.includes (category)
        ? prev.filter (c => c !== category)
        : [...prev, category];

      if(updatedCategories.length > 0){
      setFiltredItems (
        items.filter(item => updatedCategories.includes (item.category.name))
      );
      }

      if(condition){
        setFiltredItems(items.filter(item => item.condition == condition));
      }

      if(query){
        setFiltredItems(items.filter((item)=>item.name.toLowerCase().includes(query.toLowerCase())));
      }

      else{
        setFiltredItems(items);
      }

      return updatedCategories;
    });
  };



  const handlePageChange = page => {
    setCurrentPage (page);
    window.scrollTo ({
      top: document.getElementById ('productsSection').offsetTop - 100,
      behavior: 'smooth',
    });
  };

  const renderPaginationItems = () => {
    const items = [];
    const showEllipsis = totalPages > 7;

    if (showEllipsis) {
      // Always show first page
      items.push (
        <button
          key={1}
          onClick={() => handlePageChange (1)}
          className={`h-10 w-10 flex items-center justify-center rounded-lg transition-colors ${currentPage === 1 ? 'bg-sky-600 text-white' : 'text-sky-600 hover:bg-sky-50'}`}
        >
          1
        </button>
      );

      if (currentPage > 3) {
        items.push (
          <span
            key="ellipsis1"
            className="h-10 w-10 flex items-center justify-center"
          >
            ...
          </span>
        );
      }

      for (
        let i = Math.max (2, currentPage - 1);
        i <= Math.min (totalPages - 1, currentPage + 1);
        i++
      ) {
        if (i === 1 || i === totalPages) continue; // Skip first and last pages as they're always shown
        items.push (
          <button
            key={i}
            onClick={() => handlePageChange (i)}
            className={`h-10 w-10 flex items-center justify-center rounded-lg transition-colors ${currentPage === i ? 'bg-sky-600 text-white' : 'text-sky-600 hover:bg-sky-50'}`}
          >
            {i}
          </button>
        );
      }

      if (currentPage < totalPages - 2) {
        items.push (
          <span
            key="ellipsis2"
            className="h-10 w-10 flex items-center justify-center"
          >
            ...
          </span>
        );
      }

      items.push (
        <button
          key={totalPages}
          onClick={() => handlePageChange (totalPages)}
          className={`h-10 w-10 flex items-center justify-center rounded-lg transition-colors ${currentPage === totalPages ? 'bg-sky-600 text-white' : 'text-sky-600 hover:bg-sky-50'}`}
        >
          {totalPages}
        </button>
      );
    } else {
      for (let i = 1; i <= totalPages; i++) {
        items.push (
          <button
            key={i}
            onClick={() => handlePageChange (i)}
            className={`h-10 w-10 flex items-center justify-center rounded-lg transition-colors ${currentPage === i ? 'bg-sky-600 text-white' : 'text-sky-600 hover:bg-sky-50'}`}
          >
            {i}
          </button>
        );
      }
    }

    return items;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-sky-400 to-sky-800 relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1920')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-sky-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute -bottom-8 left-20 w-32 h-32 bg-sky-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-400/20 backdrop-blur-sm text-sky-100 text-sm font-medium mb-6">
              <span className="relative w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-sky-200 animate-ping" />
                <span className="relative block w-2 h-2 rounded-full bg-sky-200" />
              </span>
              New items added daily
            </span>
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight animate-float">
              Trade Smarter, <br />Not Harder
            </h1>
            <p className="text-sky-100 text-xl mb-8 leading-relaxed">
              Join our vibrant community of traders and discover amazing items. Trade up to your dream items with our smart matching system.
            </p>
            <div className="flex gap-4 mb-16">
              <button className="group px-8 py-4 bg-white text-sky-600 rounded-xl font-semibold hover:bg-sky-50 transition-all duration-300 shadow-lg shadow-sky-500/20 relative overflow-hidden">
                <span className="relative z-10">Start Trading</span>
                <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-sky-50 to-white transition-all duration-300 group-hover:w-full" />
              </button>
              <button className="group px-8 py-4 bg-sky-500 text-white rounded-xl font-semibold hover:bg-sky-400 transition-all duration-300 shadow-lg shadow-sky-600/30 backdrop-blur-sm relative overflow-hidden">
                <span className="relative z-10">Learn More</span>
                <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-sky-400 to-sky-500 transition-all duration-300 group-hover:w-full" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-8">
              {stats.map (({icon: Icon, label, value}) => (
                <div key={label} className="text-center group">
                  <Icon className="w-6 h-6 text-sky-200 mx-auto mb-2 transform transition-transform group-hover:scale-110 duration-300" />
                  <div className="text-2xl font-bold text-white mb-1">
                    {value}
                  </div>
                  <div className="text-sky-200 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div
        className={`bg-white sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sky-500 w-5 h-5 transition-colors group-focus-within:text-sky-600" />
              <input
                onChange={(e)=>handleFilter('','',e.target.value)}
                type="text"
                placeholder="Search items..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border  bg-white-50 border-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent placeholder-sky-300 text-sky-600 transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredCollections.map (({title, icon: Icon, count}) => (
              <div
                key={title}
                className="group bg-gradient-to-br from-sky-600 to-sky-300 rounded-xl p-6 text-white hover:scale-[1.02] transition-all duration-300 cursor-pointer relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <Icon className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-sky-100">{count} items available</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Popular Categories
            </h2>
            <button className="flex items-center gap-2 text-sky-600 hover:text-sky-700 group">
              View All
              {' '}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map (category => (
              <button
                key={category.name}
                onClick={() => handleFilter(category.name, '')}
                className="relative group overflow-hidden rounded-xl aspect-square"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-sky-900/90 to-sky-900/20 group-hover:from-sky-800/90 transition-colors duration-300" />
                <div className="absolute inset-0 p-4 flex flex-col justify-end transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {category.name}
                  </h3>

                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8" id="productsSection">
          <div
            className={`lg:w-72 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}
          >
            <div className="bg-white rounded-xl p-6 shadow-sm border border-sky-100">
              <h3 className="font-semibold text-gray-900 mb-4">
                All Categories
              </h3>
              <div className="space-y-3">
                {categories.map (category => (
                  <label
                    key={category.name}
                    className="flex items-center justify-between p-2 rounded-lg bg-white hover:bg-sky-50 cursor-pointer group transition-colors duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        key={category._id}
                        type="checkbox"
                        checked={selectedCategories.includes (category.name)}
                        onChange={() => handleFilter(category.name)}
                        className="w-4 h-4 rounded border border-sky-500 bg-white appearance-none checked:bg-sky-200 checked:border-transparent checked:ring-2 checked:ring-sky-500 focus:ring-2 focus:ring-sky-500 transition"
                      />
                      <span className="text-sky-900 group-hover:text-sky-700 transition-colors">
                        {category.name}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Condition */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-sky-100">
              <h3 className="font-semibold text-gray-900 mb-4">Condition</h3>
              <select
                onChange={(e)=>handleFilter('', e.target.value)}
                className="w-full px-4 py-2.5 border bg-white-50 border-sky-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 text-sky-600 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 20 20%22%3E%3Cpath stroke=%223B82F6%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22m6 8 4 4 4-4%22/%3E%3C/svg%3E')] bg-[length:1.25rem_1.25rem] bg-no-repeat bg-[right_0.5rem_center] transition-all"
              >
                <option value={false} disabled>All conditions</option>
              {
              conditions.map((condition)=><option value={condition} key={condition} >{condition}</option>
              )}
                
              </select>
            </div>
          </div>

          {/* Items Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtredItems.map (item => (
                <div
                  key={item._id}
                  className="group bg-white rounded-xl shadow-sm overflow-hidden border border-sky-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative">
                    <img
                      src={getImageUrl(item?.photos[0])}
                      alt={item.name}
                      className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 group-hover:scale-110">
                      <Heart className="w-5 h-5 text-sky-600" />
                    </button>
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 group-hover:text-sky-600 transition-colors">
                        {item.name}
                      </h3>
                    </div>
                    <div className="flex items-center text-sm text-sky-500 mb-4">
                      <Package className="w-4 h-4 mr-1.5" />
                      <span>{item.condition}</span>
                      <span className="mx-2">•</span>
                      <span>{item.category.name}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-sky-400">New York, NY</span>
                      <button
                        onClick={() => navigate (`/itemDetails/${item._id}`)}
                        className="px-4 py-2 bg-sky-50 text-sky-600 rounded-lg text-sm font-medium hover:bg-sky-100 transition-colors group-hover:bg-sky-600 group-hover:text-white"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex flex-col items-center">
              <div className="flex items-center justify-center space-x-2">
                <button
                  onClick={() =>
                    handlePageChange (Math.max (1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="h-10 w-10 flex items-center justify-center rounded-lg text-sky-600 hover:bg-sky-50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex space-x-2">
                  {renderPaginationItems ()}
                </div>

                <button
                  onClick={() =>
                    handlePageChange (Math.min (totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="h-10 w-10 flex items-center justify-center rounded-lg text-sky-600 hover:bg-sky-50 disabled:opacity-50 disabled:pointer-events-none transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <p className="mt-4 text-sm text-sky-600">
                Showing page
                {' '}
                {currentPage}
                {' '}
                of
                {' '}
                {totalPages}
                {' '}
                (
                {(currentPage - 1) * 12 + 1}
                -
                {Math.min (currentPage * 12, totalPages * 12)}
                {' '}
                of
                {' '}
                {totalPages * 12}
                {' '}
                items)
              </p>
            </div>
          </div>
        </div>

        {/* Community Connection Section */}
        <div className="mt-20 mb-16">
          <div className="bg-gradient-to-r from-sky-50 to-sky-50 rounded-2xl overflow-hidden shadow-md">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-100 text-sky-600 text-sm font-medium mb-6 w-fit">
                  <Users className="w-4 h-4" /> Community Stories
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Share Your Trading Journey
                </h2>
                <p className="text-lg text-sky-700 mb-8">
                  Connect with fellow traders, share your unique finds, and discover the stories behind every swap.
                </p>
                <div className="space-y-4 mb-8">
                  {[
                    'Join local trading circles in your neighborhood',
                    'Participate in seasonal community swap events',
                    'Share the stories behind your most meaningful trades',
                    'Connect with like-minded traders worldwide',
                  ].map ((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-sky-100 flex items-center justify-center mt-1">
                        <svg
                          width="10"
                          height="8"
                          viewBox="0 0 10 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M1 3.5L4 6.5L9 1.5"
                            stroke="#14b8a6"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                      <p className="text-sky-800">{feature}</p>
                    </div>
                  ))}
                </div>
                <div className="flex gap-4 flex-wrap">
                  <button className="px-6 py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-medium transition-colors shadow-lg shadow-sky-500/20">
                    Find Local Swaps
                  </button>
                  <button className="px-6 py-3 bg-transparent border border-sky-300 text-sky-600 hover:bg-sky-50 rounded-xl font-medium transition-colors">
                    Share Your Story
                  </button>
                </div>
              </div>
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80"
                  alt="Community trading event"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-sky-500/30 mix-blend-multiply" />
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-sky-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold">
                        120+ Local Communities
                      </p>
                      <p className="text-sky-500 text-sm">
                        Find swapping events near you
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
