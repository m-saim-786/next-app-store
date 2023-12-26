import ChessClocks from "@/components/chessTimer/ChessClocks";
import Container from "@/components/shared/Container";

export default async function Page() {
  return (
    <Container>
      <h1 className="text-center font-semibold text-2xl">Chess Timer</h1>
      <ChessClocks />
    </Container>
  );
}
