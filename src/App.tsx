import { Routes, Route } from "react-router-dom";
import { Home } from './views/Home';
import { First } from "./views/First";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/first" element={<First />} />
    </Routes>
  );
}

export default App;
