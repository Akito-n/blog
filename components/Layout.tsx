import styles from '../styles/layout.module.css'
import Link from 'next/link'

export const Layout = ({
  children,
  home
}: {
  children: any
  home: boolean
}): JSX.Element => {
  return (
    <div className="pt-20">
      <main className="block">{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  )
}
