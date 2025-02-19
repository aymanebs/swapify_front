export default function ContactHero() {
  return (
    <div className="relative h-[80vh] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1516387938699-a93567ec168e?auto=format&fit=crop&q=80')"
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/90 via-blue-700/80 to-transparent" />
      
      <div className="relative h-full  mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold text-white mb-6">Let's Start a Conversation</h1>
          <p className="text-xl text-blue-50 mb-8">
            Have questions about our organic products? We're here to help bring fresh, sustainable produce to your table.
          </p>
          <div className="flex items-center gap-4 text-blue-50">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span>24/7 Support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Quick Response</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}