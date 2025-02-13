import "./styles/global.css"
import { Route, Routes } from 'react-router-dom';
import Flights from './components/pages/Flights';
import SearchFlights from "./components/pages/SearchFlights";
import Nav from "./components/shared/Nav";
import { Fragment } from "react";
import Footer from "./components/shared/Footer";

function App() {
  return (
    <Fragment>
      <Nav />
      <Routes>
        <Route path="/" element={<Flights />} />
        <Route path="/flights/search/" element={<SearchFlights />} />
      </Routes>
      <Footer/>
    </Fragment>
  );
}
export default App;
