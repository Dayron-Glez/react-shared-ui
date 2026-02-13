import CopyClipboard from "./components/CopyClipboard";
import "../tailwind.css";
import { Button } from "./components/ui/button";

const codeExample = `interface User {
  id: number;
  name: string;
  email: string;
}

function getUser(id: number): User {
  return { id, name: "John", email: "john@example.com" };
}`;

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-dotted">
      <header className="relative flex items-center gap-4 p-4">
        <Button variant="ghost" size="icon" className=" hover:cursor-pointer">
          <img src="/favicon.ico" alt="Logo" className="size-8" />
        </Button>
        <h1 className="absolute inset-x-0 text-center text-2xl font-bold">
          React Shared UI
        </h1>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center gap-4">
        <CopyClipboard value="Hello, World!" />
        <CopyClipboard value={codeExample} variant="code" />
      </main>
    </div>
  );
}

export default App;
