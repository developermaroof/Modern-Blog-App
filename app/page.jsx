import { PostCard, Categories, PostWidget } from "@/components";
import { FeaturedPosts } from "@/sections";
import { getPosts } from "@/services";

export default async function Home() {
  const postsData = await getPosts();

  return (
    <>
      <div className="container mx-auto px-10 mb-8">
        <FeaturedPosts />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 col-span-1">
            {postsData.map((post) => (
              <PostCard post={post.node} key={post.node.title} />
            ))}
          </div>
          <div className="lg:col-span-4 col-span-1">
            <div className="relative lg:sticky top-8">
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
