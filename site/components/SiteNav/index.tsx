import Link from 'next/link';
import styles from './SiteNav.module.css';

interface Props {
  homeHref?: string;
  showStatus?: boolean;
  showGithub?: boolean;
  githubHref?: string;
}

export function SiteNav({
  homeHref = '/',
  showStatus = true,
  showGithub = true,
  githubHref = 'https://github.com/Marketing-Matt/gtmstack',
}: Props) {
  return (
    <nav className={styles.root} aria-label="Primary">
      <Link href={homeHref} className={styles.logo} aria-label="gtmstack.ai — home">
        <span className={styles.mark} aria-hidden>
          &gt;<span className={styles.cursor}>_</span>
        </span>
        <span className={styles.pipe} aria-hidden />
        <span className={styles.wordmark}>
          <span className={styles.wordmarkG}>gtm</span>
          <span className={styles.wordmarkS}>stack</span>
          <span className={styles.wordmarkT}>.ai</span>
        </span>
      </Link>

      {showStatus ? (
        <span className={styles.status}>
          <span className={styles.statusDot} aria-hidden />
          Building in public
        </span>
      ) : null}

      {showGithub ? (
        <a
          href={githubHref}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.github}
        >
          [ github ↗ ]
        </a>
      ) : null}
    </nav>
  );
}

SiteNav.displayName = 'SiteNav';

export default SiteNav;
