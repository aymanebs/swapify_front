import { Users, Leaf, Package, Truck } from "lucide-react";

const stats = [
  {
    icon: Package,
    value: "2000+",
    label: "Items",
    description: "Valuable goods ready for exchange"
  },
  {
    icon: Users,
    value: "5000+",
    label: "Happy Customers",
    description: "Building a thriving, engaged community"
  },
  {
    icon: Leaf,
    value: "100%",
    label: "Sustainable",
    description: "Promoting eco-friendly exchanges"
  },
  {
    icon: Truck,
    value: "80+",
    label: "Categories",
    description: "A wide range of items and services"
  }
];


export default function Stats() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative group bg-white p-8 rounded-2xl hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-200 to-blue-500 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            <stat.icon className="h-8 w-8 text-blue-600 mb-4" />
            <span className="text-4xl font-bold text-gray-900">
              {stat.value}
            </span>
            <h3 className="text-sm font-medium text-gray-600 mt-1">
              {stat.label}
            </h3>
            <p className="text-xs text-gray-500 mt-2">
              {stat.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}



