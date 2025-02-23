import styles from './Footer.module.css';
import ReactIcon from '../../assets/icons/react.svg?react';
import GithubIcon from '../../assets/icons/github-icon.svg?react';
import TsIcon from '../../assets/icons/typescript-icon.svg?react';
import ReduxIcon from '../../assets/icons/redux-icon.svg?react';

export function Footer() {
  return (
    <footer className={styles.info}>
      <p>
        Created by{' '}
        <a href='https://github.com/gudzilla' className={styles.gitLink}>
          gudzilla <GithubIcon className={styles.gitIcon} />
        </a>
      </p>
      <p className={styles.reactP}>
        <b>Powered by: </b>React <ReactIcon className={styles.reactIcon} /> TypeScript{' '}
        <TsIcon className={styles.reactIcon} /> Redux
        <ReduxIcon className={styles.reactIcon} />
      </p>
    </footer>
  );
}
