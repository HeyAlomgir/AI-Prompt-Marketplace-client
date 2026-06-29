

import Banner from "@/components/Banner";
import FeaturedPrompts from "@/components/FeaturedPrompts";
import HomeReviews from "@/components/HomeReviews";
import Image from "next/image";

export default async function Home() {

  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <div className=" bg-zinc-50 font-sans dark:bg-black space-y-44">

      <main >
        <Banner  />
        <FeaturedPrompts/>
        <HomeReviews/>


      </main>

    </div>
  );
}
