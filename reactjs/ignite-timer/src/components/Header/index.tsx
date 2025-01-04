import { HeaderContainer } from "./styles";

import logoIgnite from '../../assets/logo-ignite.svg'
import { Scroll, Timer } from "phosphor-react";
import { NavLink } from "react-router-dom";

export function Header() {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="" />
      <nav>
        <NavLink to="/">
          <Timer />
        </NavLink>
        <NavLink to="/history">
          <Scroll />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}