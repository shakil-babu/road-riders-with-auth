import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { userContext } from "../../App";
import { fakeInfo } from "../Home/riderInfo";
import "./Navbar.css";
const Navbar = () => {
  const forBike = fakeInfo[0];
  const activeDesign = {
    borderTop: "2px solid orangered",
    color: "orangered",
  };
  // from context
  const [loggedInUser, setLoggedInUser] = useContext(userContext);

  const signOut = () => {
      setLoggedInUser({});
  }
  return (
    <>
      <nav className="nav-area">
        <div className="container">
          <Link className='brand-title' to='/' > <h3>Road Riders</h3></Link>
          <div className="links">
            <NavLink activeStyle={activeDesign} to="/home">
              Home
            </NavLink>
            <NavLink activeStyle={activeDesign} to={`/vehicle-rental/${forBike.id}`}>
              Destination
            </NavLink>
            <NavLink activeStyle={activeDesign} to="/blog">
              Blog
            </NavLink>
            <NavLink activeStyle={activeDesign} to="/contact">
              Contact
            </NavLink>
            {loggedInUser.email ? (
              <button onClick={signOut} className="logout">
                Sign out
              </button>
            ) : (
              <NavLink className="login-link" to="/login">
                <button className="login">Log in</button>
              </NavLink>
            )}
            {loggedInUser.name && <h5 style={{marginLeft:'5px'}}>{loggedInUser.name}</h5>}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
