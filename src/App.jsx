import "./styles/global.css"
import { Route, Routes } from 'react-router-dom';
import Flights from './components/pages/Flights';
import SearchFlights from "./components/pages/SearchFlights";
import Nav from "./components/shared/Nav";
import Home from "./components/pages/Home";
import { Fragment } from "react";
import Footer from "./components/shared/Footer";

function App() {
  return (
    <Fragment>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flights/search/" element={<SearchFlights />} />
        <Route path="/flights" element={<Flights />} />
      </Routes>
      <Footer/>
    </Fragment>
  );
}
export default App;
