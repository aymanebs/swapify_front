import { Banner } from "../components/Banner";
import { Cta } from "../components/Cta";
import HowItWorks from "../components/HowItWorks";
import Newsletter from "../components/Newsletter";
import ProductGrid from "../components/ProductGrid";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";

const Home =()=>{

    return(
       
    <div className="min-h-screen">
  

      {/* Hero Section */}
      <section className="relative">
        <Banner />
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <Stats />
      </section>

      {/* About Us Section */}
      <section className="py-16 bg-gradient-to-b from-blue-100 to-blue-50">
        <Cta />
      </section>

         {/* How it works Section */}
         <section className=" bg-gradient-to-b from-blue-50 to-white">
        <HowItWorks/>
      </section>

      {/* Products Section */}
      <section className=" bg-white">
        <ProductGrid />
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-blue-50">
        <Testimonials />
      </section>

      {/* Partners */}
      <section className="py-12 bg-white">
        {/* <Partners /> */}
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white">
        <Newsletter />
      </section>

   
    </div>
        
    )
}

export default Home;