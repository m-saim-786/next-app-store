import Toolbar from "@/components/editor/Toolbar";

export default async function Editor() {
  return <>
    <main className="mx-auto w-[50rem]">
      <h1 className="text-center font-semibold">Editor</h1>

      <Toolbar />
      <div contentEditable="true" className="bg-slate-100 w-full h-96 rounded outline shadow-2xl p-5"></div>
    </main>
  </>
}