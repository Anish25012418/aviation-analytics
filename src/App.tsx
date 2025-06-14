import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import FlightsPage from "./pages/FlightsPage.tsx";
import MainLayout from "./components/layout/MainLayout.tsx";
import NotFound from "./pages/error/NotFound.tsx";
import {Toaster} from "react-hot-toast";


const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<MainLayout/>}>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/flights" element={<FlightsPage/>}/>
            <Route path="/*" element={<NotFound/>}/>
          </Route>
        </Routes>
      </Router>
      <Toaster/>
    </div>
  );
};

export default App;