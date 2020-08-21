import React from "react";

class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-inverse navbar-static-top example6">
        <div className="header">
          <a className="logo p-2" href="/">
            LinkShort
          </a>
        </div>
      </nav>
    );
  }
}

export default Header;
