import originLogo from "../assets/OriginLogo.svg";
import { memo } from "react";

function NavBar() {
  return (
    <nav>
      <img src={originLogo} className="navbar__logo" alt="origin" />
    </nav>
  );
}

export default memo(NavBar);
