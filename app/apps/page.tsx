import Link from "next/link";

export default function Page() {

  const appRoutes = [
    { href: "/apps/todo", label: "Todo App" },
    { href: "/apps/stopwatch", label: "Stopwatch" },
    { href: "/apps/chessTimer", label: "Chess Timer" },
    { href: "/apps/timezoneConvertor", label: "Timezone Convertor" },
];

  return (
    <main>
      <h1>All Apps</h1>
      <ul>
        {appRoutes.map((route) => (
          <li key={route.label}>
            <Link href={route.href}>{route.label}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
