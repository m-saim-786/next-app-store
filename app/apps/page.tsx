import Link from "next/link";

export default function Apps() {
  return (
    <main>
      <h1>All Apps</h1>
      <ul>
        <li>
          <Link href={"/apps/todo"}>Todo App</Link>
        </li>
        <li>
          <Link href={"/apps/stopwatch"}>Stopwatch</Link>
        </li>
      </ul>
    </main>
  );
}
