import { ReactNode, useEffect, useState } from "react";
import { get } from "./util/http";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import fetchingImage from './assets/data-fetching.png'

type RawDataBlogPosts = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  const [fetchedposts, setFetchedPosts] = useState<BlogPost[]>();

  useEffect(() => {
    async function fetchPosts() {
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
    }

    fetchPosts();
  }, []);

  let content: ReactNode;

  if (fetchedposts) {
    content = <BlogPosts posts={fetchedposts} />
  }
  return <main>
    <img src={fetchingImage} />
    {content}
  </main>;
}

export default App;
