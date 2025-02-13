import "./styles/global.css"
import { Route, Routes } from 'react-router-dom';
import Flights from './components/pages/Flights';
import SearchFlights from "./components/pages/SearchFlights";
import Nav from "./components/ui/Nav";
import Home from "./components/pages/Home";
import { Fragment } from "react";

function App() {
  return (
    <Fragment>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/flights/search/" element={<SearchFlights />} />
        <Route path="/flights" element={<Flights />} />
      </Routes>
    </Fragment>
  );
}
export default App;
