import React from "react";
import LeftSideSummary from "../_ui/LeftSideSummary.jsx";

const Posts = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 w-full">
      {/* Container with max width and centered */}
      <div className="w-[100%] max-w-[1800px] mx-auto pt-0 px-1">
        {/* Grid layout with fixed sidebar and flexible content */}
        <div className="grid lg:grid-cols-[300px_1fr]">
          <LeftSideSummary />
          <MainContent />
        </div>
      </div>
    </div>
  );
};

// POSTS components
// blog like style
const MainContent = () => {
  return (
    <>
      {/* Main Content - full width on mobile, with correct spacing on desktop */}
      <main className="w-full max-w-3xl px-2 g:px-12 py-8 ml-8 ">
        <div className="max-w-none">
          <h1 className="text-4xl font-bold mb-7 text-zinc-900 dark:text-white">
            Latest Posts
          </h1>

          {/* Sample Blog Posts with proper spacing */}
          {/* Would be better to define a map of posts so that it can iterative dynamically make them ie a short summary as 
          well as the link to view the whole post which will then just rerender a new index.html in another github repo*/}

          {[1, 2, 3, 4, 5].map((post) => (
            <article
              key={post}
              className="mb-4 pb-5 border-b border-zinc-200 dark:border-zinc-800 w-full"
            >
              <a
                className="text-2xl font-semibold mb-6 text-zinc-900 dark:text-white"
                href={"google.com"}
              >
                Sample Blog Post {post}{" "}
              </a>

              <div className="space-y-6 text-zinc-600 dark:text-zinc-400 text-sm">
                <p className="leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
                <p className="leading-relaxed">
                  Excepteur sint occaecat cupidatat non proident, sunt in culpa
                  qui officia deserunt mollit anim id est laborum. Sed ut
                  perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae dicta sunt explicabo.
                </p>
                <p className="leading-relaxed">
                  Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
                  odit aut fugit, sed quia consequuntur magni dolores eos qui
                  ratione voluptatem sequi nesciunt. Neque porro quisquam est,
                  qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
                  velit.
                </p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </>
  );
};

export default Posts;
