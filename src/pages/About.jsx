import React from "react";
import StorySection from "../components/about/StorySection";
import Values from "../components/about/Values";
import BakerProfiles from "../components/about/BakerProfiles";
import WorkspaceGallery from "../components/about/WorkspaceGallery";
import Newsletter from "../components/shared/Newsletter";

const About = () => {
  return (
    <div>
      {/* Hero Banner */}
      <div className="relative bg-pink-50 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              About <span className="text-pink-500">Jennylecious</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600">
              Get to know the passion, people, and principles behind our sweet
              creations.
            </p>
          </div>
        </div>
        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 70"
            className="w-full h-auto"
          >
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,32L80,37.3C160,43,320,53,480,48C640,43,800,21,960,16C1120,11,1280,21,1440,32L1440,70L0,70Z"
            ></path>
          </svg>
        </div>
      </div>

      <StorySection />
      <Values />
      <BakerProfiles />
      <WorkspaceGallery />
      <Newsletter />
    </div>
  );
};

export default About;
