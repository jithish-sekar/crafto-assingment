import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <Link to="/">
        <img
          className="w-32 m-4"
          src="https://crafto.app/public/images/crafto-by-kutumb-logo.svg"
        />
      </Link>
    </div>
  );
};

export default Navbar;
