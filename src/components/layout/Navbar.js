import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/setting";
import "../../img/showcase.jpg";

const Navbar = ({ setting: { isAuthenticated, setting }, logout }) => {
  useEffect(() => {
    console.log("settings => ", setting);
  }, [setting]);
  // const authLinks = (
  //   <ul className="navbar-nav">
  //     <li>
  //       <Link to="/profiles">Developers</Link>
  //     </li>
  //     <li>
  //       <Link to="/posts">Posts</Link>
  //     </li>
  //     <li>
  //       <Link to="/dashboard">
  //         <i className="fas fa-user" />{" "}
  //         <span className="hide-sm">Dashboard</span>
  //       </Link>
  //     </li>
  //     <li>
  //       <a onClick={logout} href="#!">
  //         <i className="fas fa-sign-out-alt" />{" "}
  //         <span className="hide-sm">Logout</span>
  //       </a>
  //     </li>
  //   </ul>
  // );

  const guestLinks = (
    <ul className="navbar-nav ml-auto mb-2 mb-lg-0">
      <li className="nav-item mr-5">
        <Link to="/dashboard">Home</Link>
      </li>
      <li className="nav-item mr-5">
        <Link to="/report">Report</Link>
      </li>
      {
        !isAuthenticated && (
          <li className="nav-item">
          <Link to="/login">Login</Link>
        </li>
        )
      }
   
      {isAuthenticated && (
        <li>
          <a onClick={logout} href="#!">
            {/* <i className="fas fa-sign-out-alt" />{" "} */}
            <span className="hide-sm">Logout</span>
          </a>
        </li>
      )}
    </ul>
  );

  return (
    <nav className="navbar navbar-expand-md bg-light navbar-light fixed-top">
      <div className="container-fluid ">
        <Link to="/" className="navbar-brand col-sm-12 col-md-6 col-lg-6 col-xs-12 col-xl-6 d-none d-md-block d-lg-none">
          {setting?.logo && <img src={setting.logo} alt="logo" height={64} />}
        </Link>
        <Link to="/" className="navbar-brand col-sm-12 col-md-6 col-lg-6 col-xs-12 col-xl-6 d-md-none d-lg-block d-flex justify-content-center">
          {setting?.logo && <img src={setting.logo} alt="logo" height={64} />}
        </Link>
        <button
          className="navbar-toggler "
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse col-sm-12 col-xs-12 col-md-6 col-lg-6" id="navbarSupportedContent">
          <Fragment>{guestLinks}</Fragment>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  setting: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  setting: state.setting,
});

export default connect(mapStateToProps, { logout })(Navbar);
