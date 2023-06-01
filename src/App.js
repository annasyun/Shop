import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import "./App.css";
import { useState } from "react";
import { AuthContextProvider } from "./context/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const [login, setLogin] = useState(false);

  const queryClient = new QueryClient();

  return (
    <section className="App">
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Header setLogin={setLogin} />
          <Outlet login={login} setLogin={setLogin} />
        </AuthContextProvider>
      </QueryClientProvider>
    </section>
  );
}

export default App;
