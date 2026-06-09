function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-r from-slate-900 to-blue-900 text-white"
    >
      <h1 className="text-5xl md:text-7xl font-bold mb-6">
        Blue Swan Lake Studios
      </h1>

      <p className="max-w-3xl text-lg md:text-xl mb-8">
        We build modern websites, digital experiences,
        and marketing solutions that help businesses grow.
      </p>

      <div className="flex gap-4 flex-wrap justify-center">
        <button className="bg-blue-500 px-6 py-3 rounded-lg hover:scale-105 transition">
          Get Started
        </button>

        <button className="border px-6 py-3 rounded-lg hover:bg-white hover:text-black transition">
          Learn More
        </button>
      </div>
    </section>
  );
}

export default Hero;