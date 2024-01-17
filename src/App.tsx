import { ReactNode, useEffect, useState } from "react";
import { get } from "./util/http";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import fetchingImage from './assets/data-fetching.png'
import ErrorMessage from "./components/ErrorMessage";

type RawDataBlogPosts = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  const [fetchedposts, setFetchedPosts] = useState<BlogPost[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState<string>();

  useEffect(() => {
    async function fetchPosts() {

      setIsFetching(true);

      try {
        const data = (await get(
          "https://jsonplaceholder.typicode.com/posts"
        )) as RawDataBlogPosts[];
  
        const blogPosts: BlogPost[] = data.map((rawPost) => {
          return {
            id: rawPost.id,
            title: rawPost.title,
            text: rawPost.body,
          };
        });

      setFetchedPosts(blogPosts);
      } catch (error) {
        if (error instanceof Error) {
          setIsError(error.message)
        }
      }
      
      setIsFetching(false);
    }

    fetchPosts();
  }, []);

  let content: ReactNode;

  if (isError) {
    content = <ErrorMessage text={isError} />
  }

  if (fetchedposts) {
    content = <BlogPosts posts={fetchedposts} />
  }

  if (isFetching) {
    content = <p id="loading-fallback">Fetching Posts...</p>
  }
  return <main>
    <img src={fetchingImage} />
    {content}
  </main>;
}

export default App;
