import Link from "next/link";

export default function Home() {
  return (
    <>
      <main>
        <h2 className="text-2xl font-bold">Welcome to Application Store</h2>
        <Link href={"/apps"} className="hover:text-blue-500">Apps</Link>
      </main>
    </>
  );
}
