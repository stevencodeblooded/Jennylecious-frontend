import React from "react";

const StorySection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
            Our <span className="text-pink-500">Story</span>
          </h2>

          <div className="prose prose-lg mx-auto">
            <p>
              Welcome to Jennylecious Cakes & Bakes, where passion meets pastry!
              Our journey began in 2013 when Jenny, our founder and head baker,
              decided to turn her lifelong passion for baking into something
              more.
            </p>

            <p>
              What started as weekend baking sessions with her grandmother
              blossomed into a deep love for creating delicious treats that
              bring joy to people's lives. After completing formal training in
              pastry arts and gaining experience working in several renowned
              bakeries, Jenny took the leap to establish her own bakery.
            </p>

            <p>
              In the beginning, Jennylecious operated from a small kitchen in
              Jenny's home, catering to friends, family, and a growing circle of
              customers who discovered her talent through word of mouth. The
              demand for her creations grew rapidly, leading to the opening of
              our first physical store in 2016.
            </p>

            <blockquote className="italic border-l-4 border-pink-300 pl-4 my-8">
              "Baking isn't just about mixing ingredients; it's about creating
              moments of happiness and celebration. Every cake tells a story,
              and I'm honored to be part of so many special occasions in our
              customers' lives."
              <footer className="text-right font-semibold">
                — Jenny, Founder
              </footer>
            </blockquote>

            <p>
              Today, Jennylecious Cakes & Bakes has grown into a beloved local
              institution, known for our attention to detail, use of premium
              ingredients, and commitment to making every celebration extra
              special. While we've expanded our team and offerings over the
              years, our core values remain the same: quality, creativity, and
              customer satisfaction.
            </p>

            <p>
              We take pride in being part of our customers' most precious
              moments—from birthdays and weddings to graduations and
              anniversaries. Each creation that leaves our kitchen carries with
              it our dedication to excellence and our passion for the craft of
              baking.
            </p>

            <p>
              As we continue to grow, we remain committed to maintaining the
              personal touch and quality that has become synonymous with the
              Jennylecious name. We look forward to being part of your
              celebrations for many years to come!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
