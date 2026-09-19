import { Link } from "react-router-dom";
import Aperture from "./Aperture.jsx";
import siteData from "../data/siteData.js";
import "./Footer.css";

const { siteInfo, categories } = siteData;

export default function Footer() {
  const social = [
    { key: "twitter", label: "تويتر", href: siteInfo.social.twitter },
    { key: "github", label: "جيت هاب", href: siteInfo.social.github },
    { key: "linkedin", label: "لينكدإن", href: siteInfo.social.linkedin },
    { key: "youtube", label: "يوتيوب", href: siteInfo.social.youtube },
  ];

  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__about">
          <Link to="/" className="brand">
            <Aperture size={30} animate={false} />
            <strong>{siteInfo.name}</strong>
          </Link>
          <p>{siteInfo.description}</p>
          <a className="site-footer__email" href={`mailto:${siteInfo.email}`}>
            {siteInfo.email}
          </a>
        </div>

        <div className="site-footer__col">
          <h4>الأقسام</h4>
          <ul>
            {categories.map((c) => (
              <li key={c.name}>
                <Link to={`/blog?category=${encodeURIComponent(c.name)}`}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__col">
          <h4>تابعنا</h4>
          <ul>
            {social.map((s) => (
              <li key={s.key}>
                <a href={s.href} target="_blank" rel="noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="site-footer__bottom">
        <div className="container">
          <p>
            © {new Date().getFullYear()} {siteInfo.name} — جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
}
