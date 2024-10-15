import "./App.css";
import Header from "./components/Global/Header/Header";
import { Routes, Route } from "react-router-dom";
import { ContextProvider } from "./features/Context";
import Home from "./components/Page/Home/Home";
import Navbar from "./components/Global/Navbar/Navbar";

function App() {
  return (
    <>
      <ContextProvider>
        <Header></Header>
        <div className="main-container">
          <Navbar></Navbar>
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />}></Route>
            </Routes>
          </div>
        </div>
      </ContextProvider>
    </>
  );
}

export default App;
