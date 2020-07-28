import React from "react";

import { ReactComponent as Logo } from "../img/venues-logo.svg";

import "./header.styles.scss";

const Header = ({ onKeyPressHandler, queryHandler, value }) => {
  return (
    <header className="main-header">
      <div className="search-wrap">
        <span className="nav">
          <Logo />
          <h2>Venues-Finder</h2>
        </span>
        <div className={`search-box`}>
          <input
            type="text"
            className="search-input"
            placeholder="Paris, fr"
            value={value}
            onChange={queryHandler}
            onKeyPress={onKeyPressHandler}
          />
          <p className="desc">Find top attractions venues anywhere</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
