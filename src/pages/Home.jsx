import React from "react";
import Hero from "../components/home/Hero";
import FeaturedProducts from "../components/home/FeaturedProducts";
import AboutPreview from "../components/home/AboutPreview";
import Testimonials from "../components/home/Testimonials";
import ServicesOverview from "../components/home/ServicesOverview";
import GalleryPreview from "../components/home/GalleryPreview";
import Newsletter from "../components/shared/Newsletter";

const Home = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <AboutPreview />
      <ServicesOverview />
      <GalleryPreview />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Home;
