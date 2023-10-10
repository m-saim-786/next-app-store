import Link from "next/link";

export default function Apps() {
  return (
    <main>
      <h1>All Apps</h1>
      <Link href={"/apps/todo"}>Todo App</Link>
    </main>
  );
}
