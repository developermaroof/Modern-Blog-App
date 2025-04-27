import { PostCard, Categories, PostWidget } from "@/components";
import { FeaturedPosts } from "@/sections";
import { getPosts } from "@/services";

export default async function Home() {
  const postsData = await getPosts();

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4 lg:px-10 pt-8 pb-16">
        <FeaturedPosts />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 col-span-1">
            {postsData.length > 0 ? (
              postsData.map((post) => (
                <PostCard post={post.node} key={post.node.title} />
              ))
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-8 text-center">
                <p className="text-gray-700 dark:text-gray-300">
                  No posts found. Check back soon!
                </p>
              </div>
            )}
          </div>
          <div className="lg:col-span-4 col-span-1">
            <div className="relative lg:sticky top-8">
              <PostWidget />
              <Categories />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
