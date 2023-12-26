import Container from "@/components/shared/Container";
import Timer from "@/components/stopwatch/Timer";

export default async function Page() {
  return (
    <Container>
      <h1 className="text-center font-semibold text-2xl">Stopwatch</h1>
      <Timer />
    </Container>
  );
}
