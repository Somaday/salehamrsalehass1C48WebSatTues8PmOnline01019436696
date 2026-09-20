import { NavLink } from "react-router-dom";
import Aperture from "./Aperture.jsx";
import "./Header.css";
import siteData from "../data/siteData.js";

const { siteInfo } = siteData;

const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/blog", label: "المدونة" },
];

export default function Header() {
  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <NavLink to="/" className="brand">
          <Aperture size={34} animate={false} />
          <span>
            <strong>{siteInfo.name}</strong>
            <em>{siteInfo.tagline}</em>
          </span>
        </NavLink>

        <nav className="site-nav" aria-label="التنقل الرئيسي">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              className={({ isActive }) =>
                "site-nav__link" + (isActive ? " is-active" : "")
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
