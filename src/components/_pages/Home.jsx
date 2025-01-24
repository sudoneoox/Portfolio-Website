import LeftSideSummary from "../_ui/LeftSideSummary.jsx";
const Home = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 w-full">
      {/* Container with max width and centered */}
      <div className="w-[100%] max-w-[1800px] mx-auto pt-0 px-1">
        {/* Grid layout with fixed sidebar and flexible content */}
        <div className="grid lg:grid-cols-[750px_1fr] gap-8">
          <LeftSideSummary />
        </div>
      </div>
    </div>
  );
};

export default Home;
