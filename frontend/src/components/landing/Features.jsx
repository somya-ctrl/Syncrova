const Features = () => {
  const features = [
    {
      number: "01",
      title: "Real-time communication",
      description:
        "Connect with your team instantly through fast and reliable real-time communication.",
    },
    {
      number: "02",
      title: "Fully customizable themes",
      description:
        "Create a workspace that feels right with fully customizable dark and light themes.",
    },
    {
      number: "03",
      title: "Advanced search",
      description:
        "Find conversations and information quickly with advanced search across all channels.",
    },
    {
      number: "04",
      title: "Native file sharing",
      description:
        "Share files directly inside your workspace with native file sharing and previewing.",
    },
  ];

  return (
    <section
      id="features"
      className="px-6 py-24 lg:py-32 bg-white"
    >

      <div className="max-w-7xl mx-auto">

        <div className="max-w-3xl mb-16">

          <p className="text-sm font-bold tracking-widest uppercase text-[#6d3df5]">
            Features
          </p>

          <h2 className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            Everything your team needs to stay in sync.
          </h2>

          <p className="mt-6 text-lg text-gray-500 max-w-2xl">
            Syncrova combines communication, organization and collaboration
            into one simple workspace.
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {features.map((feature) => (

            <div
              key={feature.number}
              className="group relative min-h-[280px] rounded-[28px] bg-[#f7f4ff] border border-[#e5def7] p-8 overflow-hidden hover:-translate-y-1 transition duration-300"
            >

              <span className="text-sm font-bold text-[#8d7eaa]">
                {feature.number}
              </span>

              <h3 className="mt-16 text-2xl font-bold">
                {feature.title}
              </h3>

              <p className="mt-4 max-w-md text-gray-500 leading-relaxed">
                {feature.description}
              </p>

              <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-purple-200/50 blur-2xl group-hover:scale-125 transition" />

            </div>

          ))}

        </div>

      </div>

    </section>
  );
};

export default Features;