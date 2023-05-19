import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";

function App() {
  return (
    <section className="App bg-red-300">
      <Header />
      <Outlet />
    </section>
  );
}

export default App;
