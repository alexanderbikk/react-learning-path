import { createRoot } from "react-dom/client";
import Pet from "./Pet";

const App = () => {
  <div>
    <h1>Adopt me</h1>
    <Pet name="Luna" animal="dog" bread="Test" />
    <Pet name="Peper" animal="bird" bread="Test" />
    <Pet name="Test" animal="cat" bread="Test" />
  </div>;
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
