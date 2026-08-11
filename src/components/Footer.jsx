import config from "../config";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-text">
          &copy; {new Date().getFullYear()} {config.footer.copyright}. Built with {config.footer.builtWith}.
        </p>
        <p className="footer-small">
          Hosted on{" "}
          <a
            href={`https://github.com/${config.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub Pages
          </a>
        </p>
      </div>
    </footer>
  );
}
