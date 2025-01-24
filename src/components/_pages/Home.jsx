import LeftSideSummary from "../_ui/LeftSideSummary.jsx";
const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 w-full">
      {/* Container with max width and centered */}
      <div className="w-[100%] max-w-[1800px] mx-auto pt-0 px-1">
        {/* Grid layout with fixed sidebar and flexible content */}
        <div className="grid lg:grid-cols-[300px_1fr]">
          <LeftSideSummary />
          <AboutMeRightHandSide />
        </div>
      </div>
    </div>
  );
};

const AboutMeRightHandSide = () => {
  return (
    <div className="max-w-4xl py-8 ml-8 lg:px-2">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-white mb-6">
        About Me
      </h1>
      <div className="text-xl mb-10 text-zinc-600 dark:text-zinc-400 leading-relaxed ">
        <p>
          Welcome! I'm a passionate student with a strong interest in
          mathematics and computer science.
        </p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages
        </p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages
        </p>
      </div>
      <h2 className="text-4xl font-semibold text-zinc-900 dark:text-white mt-6 mb-4">
        Skills & Interests
      </h2>
      <div className="text-xl">
        <ul className="list-outside text-zinc-600 dark:text-zinc-400 space-y-2">
          <li>Operating System Development</li>
          <li>Database Design & Optimization</li>
          <li>Programming with C/C++ & Javascript/Typescript</li>
          <li>Problem Solving</li>
          <li>Passion for Cultural Diversity & Exploration</li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
