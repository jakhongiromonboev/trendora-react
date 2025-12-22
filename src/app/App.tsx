import React, { useState } from "react";
import { Route, Switch, useLocation } from "react-router-dom";
import HomeNavbar from "./components/headers/HomeNavbar";
import OtherNavbar from "./components/headers/OtherNavbar";
import Footer from "./components/footer";
import { useGlobals } from "./hooks/useGlobals";
import useBasket from "./hooks/useBasket";

import HomePage from "./screens/homePage";
import ProductsPage from "./screens/productsPage";
import Contact from "./screens/contactUsPage";
import About from "./screens/aboutUsPage";
import Help from "./screens/helpPage";
// import OrdersPage from "./screens/ordersPage";
// import UserPage from "./screens/userPage";

import "../css/app.css";
import "../css/navbar.css";
import "../css/footer.css";
import AuthenticationModal from "./components/auth";
import MemberService from "../services/MemberService";
import { sweetTopSmallSuccessAlert } from "../lib/sweetAlert";
import OrdersPage from "./screens/ordersPage";

function App() {
  const location = useLocation();
  const { setAuthMember } = useGlobals();
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll } = useBasket();
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  /** HANDLERS **/

  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => setLoginOpen(false);
  const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseLogout = () => setAnchorEl(null);

  const handleLogoutRequest = async () => {
    try {
      const member = new MemberService();
      member.logout();
      await sweetTopSmallSuccessAlert("Success", 800);
      // localStorage.removeItem("cartData");
      // window.location.reload();
      setAuthMember(null);
    } catch (err) {
      console.log("Error, logout");
      throw err;
    }
  };

  return (
    <>
      {/* Conditional Navbar based on route */}
      {location.pathname === "/" ? (
        <HomeNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
        />
      ) : (
        <OtherNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}
        />
      )}

      {/* Routes */}
      <Switch>
        <Route path="/products">
          <ProductsPage onAdd={onAdd} />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <div>My Profile Page - TODO</div>
        </Route>
        <Route path="/help">
          <Help />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>

      <Footer />

      <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleLoginClose={handleLoginClose}
        handleSignupClose={handleSignupClose}
        setLoginOpen={setLoginOpen}
        setSignupOpen={setSignupOpen}
      />
    </>
  );
}

export default App;
