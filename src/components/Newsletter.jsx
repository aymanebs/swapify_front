import { Send, Sprout } from "lucide-react";

export default function Newsletter() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-sky-100 to-sky-200" />
      
      {/* Decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-72 h-72 bg-sky-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-72 h-72 bg-sky-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-sky-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <div className="inline-flex items-center justify-center gap-2 bg-sky-100 text-sky-800 rounded-full px-4 py-2 mb-8">
            <Sprout className="h-5 w-5" />
            <span className="text-sm font-medium">Join Our Community</span>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Get Fresh Updates & Exclusive Offers
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and receive the latest organic product news, special offers, and farming tips.
          </p>

          <div className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl bg-white/80 backdrop-blur-sm border border-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
              <button className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 shadow-lg shadow-sky-600/25">
                <span>Subscribe</span>
                <Send className="h-5 w-5" />
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              🌱 Join our subscribers. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}