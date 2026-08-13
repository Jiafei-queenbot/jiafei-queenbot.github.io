import { useState, useEffect } from "react";
import config from "../config";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="navbar-inner container">
        <a href="#" className="nav-logo">
          <span className="logo-dot" />
          {config.name}
        </a>
        <ul className="nav-links">
          <li><a href="#home">首页</a></li>
          <li><a href="#projects">项目</a></li>
          <li><a href="#gallery">相册</a></li>
          <li><a href="#contact">联系方式</a></li>
          <li>
            <a
              href={`https://github.com/${config.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              className="nav-github-btn"
            >
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
