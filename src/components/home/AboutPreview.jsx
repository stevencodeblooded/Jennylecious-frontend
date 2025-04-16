import React from "react";
import Button from "../shared/Button";
import cake from '../../assets/images/products/cake3.jpg'
import jenny from '../../assets/images/products/Jenny.jpg'

const AboutPreview = () => {
  return (
    <section className="py-16 bg-pink-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          {/* Image Column */}
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <div className="relative">
              {/* Main image */}
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src={jenny}
                  alt="Jenny, the master baker"
                  className="w-full h-auto"
                />
              </div>

              {/* Decorative smaller image */}
              <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-lg overflow-hidden shadow-lg border-4 border-white">
                <img
                  src={cake}
                  alt="Inside our bakery"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Experience badge */}
              <div className="absolute top-4 -left-4 bg-pink-500 text-white rounded-full p-4 shadow-lg">
                <div className="text-center">
                  <span className="block text-2xl font-bold">10+</span>
                  <span className="text-xs uppercase">Years Experience</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Column */}
          <div className="md:w-1/2 md:pl-8">
            <div className="max-w-lg">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                Meet <span className="text-pink-500">Jenny</span>, The
                Passionate Baker Behind It All
              </h2>

              <p className="text-gray-600 mb-6">
                From a young age, Jenny has been enchanted by the art of baking.
                What started as weekend activities with her grandmother has
                blossomed into a thriving business built on passion, creativity,
                and a commitment to quality.
              </p>

              <p className="text-gray-600 mb-6">
                Every cake, every pastry that comes out of our kitchen carries
                Jenny's touch of perfection. Her dedication to using only the
                finest ingredients and creating memorable experiences through
                her bakes has earned Jennylecious a special place in the
                community.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center mr-3">
                    <svg
                      className="w-6 h-6 text-orange-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Premium Quality
                    </h4>
                    <p className="text-sm text-gray-600">
                      Only the finest ingredients
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <svg
                      className="w-6 h-6 text-green-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Handcrafted</h4>
                    <p className="text-sm text-gray-600">
                      With love and attention
                    </p>
                  </div>
                </div>
              </div>

              <Button to="/about" size="lg">
                Read Our Full Story
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
