import "./App.css";
import Header from "./components/Global/Header/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Page/Home/Home";
import Navbar from "./components/Global/Navbar/Navbar";
import { UseResponsiveContext } from "./context/ResponsiveContext";
import HeaderMenu from "./components/Mobile/Global/Header/Header";

function App() {
  const { size } = UseResponsiveContext();
  return (
    <>
      {size.width < 992 ? <HeaderMenu /> : <Header />}
      <div className="main-container">
        {size.width < 992 ? "" : <Navbar />}
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
