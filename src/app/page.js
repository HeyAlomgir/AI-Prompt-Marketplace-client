

import Banner from "@/components/Banner";
import Image from "next/image";

export default async function Home() {

  await new Promise((resolve) => setTimeout(resolve, 3000));
  return (
    <div className=" bg-zinc-50 font-sans dark:bg-black space-y-44">

      <main className="mt-5 py-24">
        <Banner  />

      </main>

    </div>
  );
}
