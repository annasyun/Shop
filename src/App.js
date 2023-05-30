import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import { useState } from "react";
import { AuthContextProvider } from "./components/context/AuthContext";

function App() {
  const [login, setLogin] = useState(false);

  return (
    <section className="App">
      <AuthContextProvider>
        <Header setLogin={setLogin} />
        <Outlet login={login} setLogin={setLogin} />
      </AuthContextProvider>
    </section>
  );
}

export default App;
