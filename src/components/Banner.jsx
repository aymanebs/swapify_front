import { useState, useEffect } from 'react';
import { ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';
import banner1 from './../assets/banner1.jpg';
import banner2 from './../assets/banner2.jpg';
import banner3 from './../assets/banner3.jpg';


const slides = [
  {
    image: banner1,
    title: "Fresh from the Farm",
  },
  {
    image: banner2,
    title: "Organic Produce",
  },
  {
    image: banner3,
    title: "Natural Goodness",
  }
];

export const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative h-[90vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentSlide === index ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundAttachment: 'fixed'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-900/90 to-sky-900/40" />
        </div>
      ))}

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-xl">
 

          <h1 className="text-5xl font-bold text-white sm:text-6xl">
            Swap your Items  
            <strong className="block font-extrabold text-sky-300 mt-2">
            Online for free
            </strong>
          </h1>

          <p className="mt-6 text-lg text-sky-100 max-w-lg">
            "Swapify is the easiest way to swap your items"
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/items" className="inline-flex items-center gap-2 rounded-lg bg-sky-500 px-8 py-4 text-white transition hover:bg-sky-600 hover:scale-105 transform duration-200">
              <span className="text-sm font-medium">Explore Items</span>
              <ArrowRight className="h-5 w-5" />
          </Link>

            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-8 py-4 text-white transition hover:bg-white/20 backdrop-blur-sm"
            >
              <span className="text-sm font-medium">Learn More</span>
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-white scale-125" : "bg-white/50"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}