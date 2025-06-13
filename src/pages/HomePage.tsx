const HomePage = () => {
  return (
    <div className="relative w-full h-screen sm:h-[calc(100vh-6rem)] overflow-hidden rounded-2xl">
        {/* Background Image */}
        <img
          src="/img1.jpg"
          alt="Everest Experience"
          className="absolute inset-0 w-full h-full object-cover rounded-2xl"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10 rounded-2xl"/>

        {/* Content */}
        <div className="relative z-10 flex flex-col md:items-center mt-50 h-full text-white px-4">
          <h1 className="text-3xl md:text-5xl font-semibold">
            <span className="text-yellow-400">EVEREST EXPERIENCE</span> FLIGHT
          </h1>
          <p className="text-lg md:text-xl mt-2 mb-4 tracking-wide">
            A LIFETIME EXPERIENCE
          </p>

        </div>
      </div>
  );
};

export default HomePage;