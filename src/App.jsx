import { useContext } from "react";
import Navbar from "./Components/Navbar";
import Lobby from "./Authentication/Page/Lobby";
import AppRoute from "./Routes/AppRoutes";
import { AppContext } from "./context/AppContext";

function App() {
  const { user } = useContext(AppContext);

  return (
    <>
      {/* show the lobby (signup/signin links) only when there's no authenticated user */}
      {!user && <Lobby />}

      {/* render main navbar only when user is signed in */}
      {user && <Navbar />}

      <AppRoute />
    </>
  );
}

export default App;
