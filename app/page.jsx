import { PostCard, Categories, PostWidget, Header } from "@/components";

const posts = [
  { title: "Post 1", excerpt: "Content for post 1" },
  { title: "Post 2", excerpt: "Content for post 2" },
];
export default function Home() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-10 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 col-span-1">
            {posts.map((post) => (
              <PostCard post={post} key={post.title} />
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
