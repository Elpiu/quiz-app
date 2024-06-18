"use server"

import {transformData} from "@/lib/converter/txtToJson";

export default async function Home() {

  console.log("Home page Init...")
  if (process.env.TRANSLATE){
    await transformData()
  }
  console.log("Finito")


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>We Bello Stai nella Home</h1>
    </main>
  );
}
