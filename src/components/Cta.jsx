import { Handshake, RefreshCw, Globe, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const Cta = () => {
  const features = [
    {
      icon: Handshake,
      title: "Fair Trade",
      description: "Exchange goods easily with a community-driven barter system built on trust."
    },
    {
      icon: RefreshCw,
      title: "Sustainable Economy",
      description: "Promote sustainability by reusing and exchanging items instead of discarding them."
    },
    {
      icon: Globe,
      title: "Global Reach",
      description: "Connect with users worldwide to trade goods without the need for money."
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Wondering why you should trade?
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Here’s a couple good reasons
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-center">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            {/* Centering the Circle and Icon */}
            <div className="flex justify-center">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-6">
                <feature.icon className="h-8 w-8 text-blue-600" />
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <span>Exchange Items</span>
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};
