import "../styles/footer.scss";
import GitHubIcon from "@mui/icons-material/GitHub";
export function FooterLayout() {
  return (
    <div className="footer">
      Click&nbsp;
      <a
        href="https://github.com/Ponniah96/currency-converter-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <GitHubIcon />
      </a>
      &nbsp;icon to navigate gitHub codebase
    </div>
  );
}
