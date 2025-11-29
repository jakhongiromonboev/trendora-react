import React from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import HomeNavbar from "./components/headers/HomeNavbar";
// import OtherNavbar from "./components/headers/OtherNavbar";
// import Footer from "./components/footer/Footer";

// TODO: Import pages when ready
// import HomePage from "./screens/homePage";
// import ProductsPage from "./screens/productsPage";
// import OrdersPage from "./screens/ordersPage";
// import UserPage from "./screens/userPage";
// import HelpPage from "./screens/helpPage";
// import AboutPage from "./screens/aboutPage";

import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";

function App() {
  const location = useLocation();

  return (
    <>
      {/* Conditional Navbar based on route */}
      {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}

      {/* Routes */}
      <Switch>
        <Route path="/products">
          <div>Products Page - TODO</div>
        </Route>
        <Route path="/orders">
          <div>Orders Page - TODO</div>
        </Route>
        <Route path="/member-page">
          <div>My Profile Page - TODO</div>
        </Route>
        <Route path="/help">
          <div>Help Page - TODO</div>
        </Route>
        <Route path="/about">
          <div>About Us Page - TODO</div>
        </Route>
        <Route path="/">
          <div>Home Page - TODO</div>
        </Route>
      </Switch>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default App;
