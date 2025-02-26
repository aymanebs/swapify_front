import image1 from './../assets/howitworks_image1.png';
import image2 from './../assets/howitworks_image2.png';
import image3 from './../assets/howitworks_image3.png';
import image4 from './../assets/howitworks_image4.png';

export default function HowItWorks() {
    return (
      <div className=" ">
        <section className="px-4 py-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-center text-4xl font-bold text-gray-900 mb-28">HOW IT WORKS</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-sky-400 rounded-full flex items-center justify-center ">
                  <img
                    src={image1}
                    alt="Become a Member"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">1. Become a Member</h3>
                <p className="text-gray-600 max-w-xs">
                  Sign up for free and join our community of item swappers. Create your profile and start browsing.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-sky-400 rounded-full flex items-center justify-center mb-4">
                  <img
                    src={image2}
                    alt="List Your Items"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">2. List Your Items</h3>
                <p className="text-gray-600 max-w-xs">
                  Upload photos and descriptions of items you'd like to swap. The more details, the better!
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-sky-400 rounded-full flex items-center justify-center mb-4">
                  <img
                    src={image3}
                    alt="Make Your Swap"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">3. Make Your Swap</h3>
                <p className="text-gray-600 max-w-xs">
                  Find items you like and propose trades with other members. Negotiate until both parties are happy.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-sky-400 rounded-full flex items-center justify-center mb-4">
                  <img
                    src={image4}
                    alt="Complete the Exchange"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-black">4. Complete the Exchange</h3>
                <p className="text-gray-600 max-w-xs">
                  Meet safely or ship items to complete your swap. Rate your experience and keep swapping!
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
  
  
  