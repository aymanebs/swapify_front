import React, { useState, useEffect } from 'react';
import { Search, Sliders, Package, Star, Heart, ChevronDown, X, ArrowRight, Sparkles, TrendingUp, Users, Gift, ShoppingBag, Clock, MapPin, Zap, Shield, Trophy } from 'lucide-react';
export const Items = ()=> {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [condition, setCondition] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { icon: Users, label: 'Active Traders', value: '50K+' },
    { icon: Gift, label: 'Items Traded', value: '100K+' },
    { icon: TrendingUp, label: 'Monthly Trades', value: '15K+' },
  ];

  const categories = [
    { name: 'Electronics', count: 245, image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=500' },
    { name: 'Furniture', count: 189, image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=500' },
    { name: 'Books', count: 320, image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=500' },
    { name: 'Sports', count: 156, image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=500' },
    { name: 'Fashion', count: 278, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=500' },
  ];

  const features = [
    { icon: Zap, title: 'Lightning Fast', description: 'Trade items instantly with our quick match system' },
    { icon: Shield, title: 'Secure Trading', description: 'Your items are protected with our secure system' },
    { icon: Trophy, title: 'Rewards Program', description: 'Earn points with every successful trade' },
  ];

  const featuredCollections = [
    { title: 'New Arrivals', icon: ShoppingBag, count: 156 },
    { title: 'Ending Soon', icon: Clock, count: 89 },
    { title: 'Near You', icon: MapPin, count: 234 },
  ];

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-sky-400 to-blue-800 relative overflow-hidden w-full">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557821552-17105176677c?auto=format&fit=crop&w=1920')] opacity-10 bg-cover bg-center mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
          <div className="absolute top-40 right-10 w-32 h-32 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-32 h-32 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-400/20 backdrop-blur-sm text-blue-100 text-sm font-medium mb-6">
              <span className="relative w-2 h-2">
                <span className="absolute inset-0 rounded-full bg-blue-200 animate-ping" />
                <span className="relative block w-2 h-2 rounded-full bg-blue-200" />
              </span>
              New items added daily
            </span>
            <h1 className="text-6xl font-bold text-white mb-6 leading-tight animate-float">
              Trade Smarter, <br />Not Harder
            </h1>
            <p className="text-blue-100 text-xl mb-8 leading-relaxed">
              Join our vibrant community of traders and discover amazing items. Trade up to your dream items with our smart matching system.
            </p>
            <div className="flex gap-4 mb-16">
              <button className="group px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 shadow-lg shadow-blue-500/20 relative overflow-hidden">
                <span className="relative z-10">Start Trading</span>
                <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-blue-50 to-white transition-all duration-300 group-hover:w-full" />
              </button>
              <button className="group px-8 py-4 bg-blue-500 text-white rounded-xl font-semibold hover:bg-blue-400 transition-all duration-300 shadow-lg shadow-blue-600/30 backdrop-blur-sm relative overflow-hidden">
                <span className="relative z-10">Learn More</span>
                <div className="absolute inset-0 h-full w-0 bg-gradient-to-r from-blue-400 to-blue-500 transition-all duration-300 group-hover:w-full" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-8">
              {stats.map(({ icon: Icon, label, value }) => (
                <div key={label} className="text-center group">
                  <Icon className="w-6 h-6 text-blue-200 mx-auto mb-2 transform transition-transform group-hover:scale-110 duration-300" />
                  <div className="text-2xl font-bold text-white mb-1">{value}</div>
                  <div className="text-blue-200 text-sm">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white w-full py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-lg text-blue-600">Experience the future of trading</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map(({ icon: Icon, title, description }) => (
              <div key={title} className="group p-6 bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
                <p className="text-blue-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search Header */}
      <div className={`bg-white sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative group">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5 transition-colors group-focus-within:text-blue-600" />
              <input
                type="text"
                placeholder="Search items..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border  bg-blue-50 border-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-blue-300 text-blue-600 transition-all"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all duration-300"
            >
              <Sliders className="w-5 h-5" />
              <span className="hidden sm:inline">Filters</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Featured Collections */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {featuredCollections.map(({ title, icon: Icon, count }) => (
              <div key={title} className="group bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-6 text-white hover:scale-[1.02] transition-all duration-300 cursor-pointer relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <Icon className="w-8 h-8 mb-4 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-blue-100">{count} items available</p>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Categories */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Popular Categories</h2>
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-700 group">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.map(category => (
              <button
                key={category.name}
                onClick={() => toggleCategory(category.name)}
                className="relative group overflow-hidden rounded-xl aspect-square"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-blue-900/20 group-hover:from-blue-800/90 transition-colors duration-300" />
                <div className="absolute inset-0 p-4 flex flex-col justify-end transform transition-transform duration-300 group-hover:translate-y-[-8px]">
                  <h3 className="text-white font-semibold text-lg mb-1">{category.name}</h3>
                  <p className="text-blue-200 text-sm">{category.count} items</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-72 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            {/* Categories */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
              <h3 className="font-semibold text-gray-900 mb-4">All Categories</h3>
              <div className="space-y-3">
                {categories.map(category => (
                  <label key={category.name} className="flex items-center justify-between p-2 rounded-lg bg-white hover:bg-blue-50 cursor-pointer group transition-colors duration-200">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.name)}
                        onChange={() => toggleCategory(category.name)}
                        className="w-4 h-4 rounded border border-blue-500 bg-white appearance-none checked:bg-blue-200 checked:border-transparent checked:ring-2 checked:ring-blue-500 focus:ring-2 focus:ring-blue-500 transition"
                      />
                      <span className="text-blue-900 group-hover:text-blue-700 transition-colors">{category.name}</span>
                    </div>
                    <span className="text-sm text-blue-400">{category.count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
              <h3 className="font-semibold text-gray-900 mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-sm text-blue-600 mb-1.5 block">Min Price</label>
                    <input
                      type="number"
                      value={priceRange[0]}
                      onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
                      className="w-full px-4 py-2.5 border  bg-blue-50 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600 placeholder-blue-300 transition-all"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm  text-blue-600 mb-1.5 block">Max Price</label>
                    <input
                      type="number"
                      value={priceRange[1]}
                      onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
                      className="w-full px-4 py-2.5 border  bg-blue-50 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600 placeholder-blue-300 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Condition */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-blue-100">
              <h3 className="font-semibold text-gray-900 mb-4">Condition</h3>
              <select
                value={condition}
                onChange={e => setCondition(e.target.value)}
                className="w-full px-4 py-2.5 border bg-blue-50 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-600 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 20 20%22%3E%3Cpath stroke=%223B82F6%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22 stroke-width=%221.5%22 d=%22m6 8 4 4 4-4%22/%3E%3C/svg%3E')] bg-[length:1.25rem_1.25rem] bg-no-repeat bg-[right_0.5rem_center] transition-all"
              >
                <option value="all">All Conditions</option>
                <option value="like new">Like New</option>
                <option value="excellent">Excellent</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>
          </div>

          {/* Items Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map(item => (
                <div key={item} className="group bg-white rounded-xl shadow-sm overflow-hidden border border-blue-100 hover:shadow-lg transition-all duration-300">
                  <div className="relative">
                    <img
                      src={`https://images.unsplash.com/photo-${1550000000000 + item}?auto=format&fit=crop&w=500&q=60`}
                      alt="Item"
                      className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <button className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300 group-hover:scale-110">
                      <Heart className="w-5 h-5 text-blue-600" />
                    </button>
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-lg transform transition-transform duration-300 group-hover:translate-y-[-4px]">
                      <div className="flex items-center space-x-1">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        <span className="text-sm font-medium text-blue-900">Premium</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">Premium Item {item}</h3>
                      <span className="text-blue-600 font-semibold">$299</span>
                    </div>
                    <div className="flex items-center text-sm text-blue-500 mb-4">
                      <Package className="w-4 h-4 mr-1.5" />
                      <span>Like New</span>
                      <span className="mx-2">•</span>
                      <span>Electronics</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-400">New York, NY</span>
                      <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

