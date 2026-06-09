function Services() {
  const services = [
    "Web Design",
    "Web Development",
    "UI/UX Design",
    "SEO Optimization",
    "Digital Marketing",
    "Brand Strategy",
  ];

  return (
    <section id="services" className="py-20 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-12">
        Our Services
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
        {services.map((service) => (
          <div
            key={service}
            className="bg-white p-8 rounded-xl shadow-lg hover:-translate-y-2 transition"
          >
            <h3 className="text-xl font-bold mb-4">
              {service}
            </h3>
            <p>
              Professional solutions tailored for your business needs.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;