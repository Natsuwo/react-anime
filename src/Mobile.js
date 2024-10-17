import "./App.css";
import Header from "./components/Mobile/Global/Header/Header";
import Home from "./components/Mobile/Page/Home/Home";
import "./Mobile.css";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <div className="main-container">
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;
