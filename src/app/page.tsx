import AnimatedTitle from "@/components/AnimatedTitle";
import RecentPosts from "@/components/MainPage/RecentPosts";

export default async function Home() {
  return (
    <div className="max-w-screen-lg w-full px-4 sm:w-[80%] md:w-[70%] lg:w-[60%] mx-auto my-5">
      <AnimatedTitle />
      <RecentPosts />
    </div>
  );
}
