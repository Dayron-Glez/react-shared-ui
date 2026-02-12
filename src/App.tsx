import CopyClipboard from "./components/CopyClipboard";
import "../tailwind.css";

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
    <div className="flex min-h-screen flex-col items-center justify-center gap-6">
      <CopyClipboard value="Hello, World!" />
      <CopyClipboard value={codeExample} variant="code" />
    </div>
  );
}

export default App;
