import React from "react";

const BakerProfiles = () => {
  const teamMembers = [
    {
      id: 1,
      name: "Jenny Lee",
      role: "Founder & Head Baker",
      image: "/assets/images/team/jenny.jpg",
      bio: "With over 15 years of baking experience, Jenny is the creative force behind Jennylecious. Her passion for baking started in her grandmother's kitchen and has evolved into a lifelong commitment to the craft.",
      specialties: ["Wedding Cakes", "Custom Designs", "French Pastries"],
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      role: "Pastry Chef",
      image: "/assets/images/team/michael.jpg",
      bio: "A graduate of Le Cordon Bleu, Michael brings classical training and innovative techniques to our kitchen. His attention to detail and commitment to perfection make him an invaluable part of our team.",
      specialties: ["Artisan Bread", "Croissants", "Chocolate Work"],
    },
    {
      id: 3,
      name: "Sarah Johnson",
      role: "Cake Designer",
      image: "/assets/images/team/sarah.jpg",
      bio: "Sarah's background in fine arts gives her a unique perspective on cake design. She specializes in creating stunningly beautiful and structurally sound cakes that are true edible masterpieces.",
      specialties: ["3D Cakes", "Sugar Flowers", "Artistic Finishes"],
    },
    {
      id: 4,
      name: "David Chen",
      role: "Baker & Customer Relations",
      image: "/assets/images/team/david.jpg",
      bio: "David combines his baking skills with excellent customer service to ensure that each client's vision is brought to life perfectly. His friendly demeanor and attention to client needs make him a customer favorite.",
      specialties: ["Cupcakes", "Cookie Designs", "Customer Consultations"],
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Meet Our <span className="text-pink-500">Team</span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            The talented individuals who bring your sweet dreams to life. Our
            team combines creativity, skill, and passion to create delicious
            works of art.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white rounded-lg overflow-hidden shadow-md"
            >
              <div className="aspect-w-1 aspect-h-1 relative">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {member.name}
                </h3>
                <p className="text-pink-500 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 mb-4 text-sm">{member.bio}</p>
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">
                    Specialties:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="bg-pink-100 text-pink-700 text-xs px-2 py-1 rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BakerProfiles;
