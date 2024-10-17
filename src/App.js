import "./App.css";
import Header from "./components/Global/Header/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Page/Home/Home";
import Navbar from "./components/Global/Navbar/Navbar";

function App() {
  return (
    <>
      <Header></Header>
      <div className="main-container">
        <Navbar></Navbar>
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
