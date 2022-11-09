import logo from "./logo.svg";
import "./App.css";
import { Home } from "./Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <>
              <Home />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
