import { useContext } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { MyContext } from "./index";
import Dashboard from "./components/Dashboard";
import { isEmpty } from "lodash";
import Login from "./components/Login";
import "./App.css";
import Test from "./components/Test";

function App() {
  const { user, setUser } = useContext(MyContext);
  if (isEmpty(user)) {
    return <Login setUser={setUser} />;
  }

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
