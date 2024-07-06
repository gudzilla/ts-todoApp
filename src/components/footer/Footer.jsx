import styles from "./Footer.module.css";
import ReactIcon from "../../assets/icons/react.svg?react";
import GithubIcon from "../../assets/icons/github-icon.svg?react";

export function Footer() {
  return (
    <footer className={styles.info}>
      <p>
        Created by{" "}
        <a href="https://github.com/gudzilla" className={styles.gitLink}>
          gudzilla <GithubIcon className={styles.gitIcon} />
        </a>
      </p>
      <p className={styles.reactP}>
        Powered by React <ReactIcon className={styles.reactIcon} />
      </p>
    </footer>
  );
}
