import { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { loadUser, logout } from "../../redux/user/user.actions";
import logo from "../../assets/logo.jpg";

const Header = ({
  // removeLogo,
  user: { isAuthenticated },
  loadUser,
  logout,
}) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <header id="topnav" className="defaultscroll sticky">
      <div className="container">
        <div>
          <Link className="logo" to="/">
            <img src={logo} className="l-dark" height="24" alt="" />
            <img src={logo} className="l-light" height="24" alt="" />
          </Link>
        </div>

        {isAuthenticated ? (
          <div className="buy-button">
            <Link to="#!" onClick={() => logout()}>
              <div className="btn btn-light login-btn-light">Logout</div>
            </Link>
          </div>
        ) : (
          <div className="buy-button">
            <Link to="/login">
              <div className="btn btn-light login-btn-light">Login</div>
            </Link>
          </div>
        )}

        <div className="menu-extras">
          <div className="menu-item">
            {/*  eslint-disable-next-line  */}
            <div className="navbar-toggle">
              <div className="navlink">
                <ul className="">
                  <li>
                    <Link to="">Home</Link>
                  </li>
                  <li>
                    <Link to="/profile">Profile</Link>
                  </li>
                  <li>
                    <Link to="/product">Products</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div id="navigation">
          <ul className="navigation-menu">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li className="has-submenu">
              <Link to="#!">Products</Link>
              <span className="menu-arrow"></span>
              <ul className="submenu megamenu">
                <li>
                  <ul>
                    <li>
                      <Link to="/standard">Standard</Link>
                    </li>
                    <li>
                      <Link to="/classic">Classic</Link>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

export default connect(mapStateToProps, { loadUser, logout })(Header);
