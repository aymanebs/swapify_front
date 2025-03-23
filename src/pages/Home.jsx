import { useEffect, useState } from "react";
import { Banner } from "../components/Banner";
import { Cta } from "../components/Cta";
import HowItWorks from "../components/HowItWorks";
import Newsletter from "../components/Newsletter";
import ProductGrid from "../components/ProductGrid";
import Stats from "../components/Stats";
import Testimonials from "../components/Testimonials";
import { getLastItems } from "../services/itemsApi";

const Home =()=>{

  const [fetchedItems, setFetchedItems]= useState([]);

  useEffect(()=>{
    async function fetchItems(){
      try{
        const data = await getLastItems();
        setFetchedItems([...data]);
      }
      catch(error){
        console.error('Failed to fetch items in home: ',error);
      }
  
  
    }
    fetchItems()
  },[]);


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
      <section className="py-16 bg-gradient-to-b from-sky-100 to-sky-50">
        <Cta />
      </section>

         {/* How it works Section */}
         <section className=" bg-gradient-to-b from-sky-50 to-white">
        <HowItWorks/>
      </section>

      {/* Products Section */}
      <section className=" bg-white">
        {
         fetchedItems.length>0 &&(
          <ProductGrid 
          items = {fetchedItems}
          />
         )
        }
   
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-sky-50">
        <Testimonials />
      </section>

      {/* Newsletter */}
      <section className=" bg-white">
        <Newsletter />
      </section>

   
    </div>
        
    )
}

export default Home;