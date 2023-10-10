import Timer from "@/components/stopwatch/Timer";

export default async function StopWatch() {
  return (
    <main className="mx-auto w-[40rem]">
      <h1 className="text-center font-semibold text-2xl">Stopwatch</h1>
      <Timer />
    </main>
  );
}
