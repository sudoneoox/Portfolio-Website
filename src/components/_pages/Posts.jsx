import React from "react";
import LeftSideSummary from "../_ui/LeftSideSummary.jsx";
import "../../styles/output.css";

const Posts = () => {
  return (
    <>
      <div className="main-content-left-summary">
        <LeftSideSummary />
      </div>
      <div className="main-content-right-summary">
        <MainContent />
      </div>
    </>
  );
};

// POSTS components
// blog like style
const MainContent = () => {
  return (
    <>
      {/* Main Content - full width on mobile, with correct spacing on desktop */}
      <main className="main-content-right-summary-blog-container">
        <h1 className="main-content-right-summary-blog-container-title text-zinc-900 dark:text-white">
          Latest Posts
        </h1>

        {/* Sample Blog Posts with proper spacing */}
        {/* Would be better to define a map of posts so that it can iterative dynamically make them ie a short summary as 
          well as the link to view the whole post which will then just rerender a new index.html in another github repo*/}

        {[1, 2, 3, 4, 5].map((post) => (
          <article
            key={post}
            className="main-content-right-summary-blog-container-article border-zinc-200 dark:border-zinc-800"
          >
            <a
              className="main-content-right-summary-blog-container-link text-zinc-900 dark:text-white"
              href={"google.com"}
            >
              Sample Blog Post {post}{" "}
            </a>

            <div className="main-content-right-summary-blog-container-text-container space-y-6 text-zinc-600 dark:text-zinc-400">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur.
              </p>
              <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa
                qui officia deserunt mollit anim id est laborum. Sed ut
                perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo.
              </p>
              <p>
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
                aut fugit, sed quia consequuntur magni dolores eos qui ratione
                voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem
                ipsum quia dolor sit amet, consectetur, adipisci velit.
              </p>
            </div>
          </article>
        ))}
      </main>
    </>
  );
};

export default Posts;
