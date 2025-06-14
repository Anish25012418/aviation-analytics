const HomePage = () => {
  return (
    <div className="relative w-full h-screen sm:h-[calc(100vh-6rem)] overflow-hidden rounded-2xl">
        <img
          src="/img1.jpg"
          alt="FLIGHT ANALYTICS"
          className="absolute inset-0 w-full h-full object-cover rounded-2xl"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10 rounded-2xl"/>

        <div className="relative z-10 flex flex-col md:items-center mt-40 h-full text-white px-4">
          <h1 className="text-3xl md:text-5xl font-semibold">
             <span className="text-yellow-400"> FLIGHT ANALYTICS</span> ULTIMATE
          </h1>
          <p className="text-lg md:text-xl mt-2 mb-4 tracking-wide">
            GET ALL FLIGHT DATA IN ONE PLACE
          </p>

        </div>
      </div>
  );
};

export default HomePage;